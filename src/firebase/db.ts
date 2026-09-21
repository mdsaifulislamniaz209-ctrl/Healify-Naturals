import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import { Product } from "../types";

export interface ChatMessage {
  id?: string;
  sender: 'user' | 'support';
  senderName: string;
  text: string;
  phone?: string;
  productContext?: string;
  timestamp: Timestamp | Date | any;
  createdAtText?: string;
}

export interface StoredOrderInquiry {
  id?: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  productName: string;
  productId?: string;
  quantity: number;
  deliveryArea: string;
  deliveryCost: number;
  grandTotal: number;
  notes?: string;
  rawWhatsAppMessage: string;
  status: 'pending' | 'confirmed' | 'dispatched' | 'cancelled';
  createdAt: Timestamp | Date | any;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  phone: string;
  inquiryType: string;
  message: string;
  createdAt: Timestamp | Date | any;
}

// Helper to clean undefined values which Firestore forbids
const stripUndefined = <T extends Record<string, any>>(obj: T): Record<string, any> => {
  const clean: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined) {
      clean[key] = obj[key];
    }
  });
  return clean;
};

// 1. CHAT MESSAGES LOGGING & REAL-TIME
export const sendChatMessageToFirebase = async (messageData: {
  sender: 'user' | 'support';
  senderName: string;
  text: string;
  phone?: string;
  productContext?: string;
}) => {
  try {
    const colRef = collection(db, "chat_messages");
    const payload: Record<string, any> = {
      sender: messageData.sender || 'user',
      senderName: messageData.senderName || 'সম্মানিত গ্রাহক',
      text: messageData.text || '',
      timestamp: serverTimestamp(),
      createdAtText: new Date().toLocaleTimeString('bn-BD', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    if (messageData.phone && messageData.phone.trim()) {
      payload.phone = messageData.phone.trim();
    }
    if (messageData.productContext && messageData.productContext.trim()) {
      payload.productContext = messageData.productContext.trim();
    }

    const docRef = await addDoc(colRef, payload);
    return docRef.id;
  } catch (error) {
    console.error("Error saving chat message to Firestore:", error);
    throw error;
  }
};

export const subscribeToChatMessages = (callback: (messages: ChatMessage[]) => void) => {
  const colRef = collection(db, "chat_messages");
  const q = query(colRef, orderBy("timestamp", "asc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const msgs: ChatMessage[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ChatMessage, "id">),
      }));
      callback(msgs);
    },
    (err) => {
      console.warn("Chat listener fallback:", err);
    }
  );
};

// 2. ORDER INQUIRIES
export const saveOrderInquiryToFirebase = async (orderData: {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  productName: string;
  productId?: string;
  quantity: number;
  deliveryArea: string;
  deliveryCost: number;
  grandTotal: number;
  notes?: string;
  rawWhatsAppMessage: string;
}) => {
  try {
    const colRef = collection(db, "order_inquiries");
    const sanitizedData = {
      customerName: orderData.customerName || '',
      customerPhone: orderData.customerPhone || '',
      customerAddress: orderData.customerAddress || '',
      productName: orderData.productName || '',
      productId: orderData.productId || '',
      quantity: orderData.quantity || 1,
      deliveryArea: orderData.deliveryArea || '',
      deliveryCost: orderData.deliveryCost || 0,
      grandTotal: orderData.grandTotal || 0,
      notes: orderData.notes || '',
      rawWhatsAppMessage: orderData.rawWhatsAppMessage || '',
      status: "pending",
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(colRef, sanitizedData);
    return docRef.id;
  } catch (error) {
    console.error("Error saving order to Firestore:", error);
    return null;
  }
};

export const subscribeToOrderInquiries = (callback: (orders: StoredOrderInquiry[]) => void) => {
  const colRef = collection(db, "order_inquiries");
  const q = query(colRef, orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const orders: StoredOrderInquiry[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<StoredOrderInquiry, "id">),
      }));
      callback(orders);
    },
    (err) => {
      console.warn("Orders listener fallback:", err);
    }
  );
};

// 3. CONTACT DESK SUBMISSIONS
export const saveContactSubmissionToFirebase = async (contactData: {
  name: string;
  phone: string;
  inquiryType: string;
  message: string;
}) => {
  try {
    const colRef = collection(db, "contact_submissions");
    const docRef = await addDoc(colRef, {
      ...contactData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving contact submission to Firestore:", error);
    return null;
  }
};

// 4. CLOUD PRODUCTS CATALOG SYNC
export const syncProductToFirebase = async (product: Product) => {
  try {
    const docRef = doc(db, "products", product.id);
    const cleanProduct = stripUndefined(product);
    await setDoc(docRef, {
      ...cleanProduct,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error syncing product to Firestore:", error);
    return false;
  }
};

export const updateProductInFirebase = async (product: Product) => {
  try {
    const docRef = doc(db, "products", product.id);
    const cleanProduct = stripUndefined(product);
    await setDoc(
      docRef,
      {
        ...cleanProduct,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.error("Error updating product in Firestore:", error);
    return false;
  }
};

export const deleteProductFromFirebase = async (productId: string) => {
  try {
    const docRef = doc(db, "products", productId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error removing product from Firestore:", error);
    return false;
  }
};

export const fetchProductsFromFirebase = async (): Promise<Product[] | null> => {
  try {
    const colRef = collection(db, "products");
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) return null;
    return snapshot.docs.map((doc) => doc.data() as Product);
  } catch (error) {
    console.warn("Could not fetch remote products:", error);
    return null;
  }
};

export const subscribeToProducts = (callback: (products: Product[]) => void) => {
  const colRef = collection(db, "products");
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: Product[] = snapshot.docs.map((doc) => doc.data() as Product);
      callback(items);
    },
    (err) => {
      console.warn("Products listener fallback:", err);
    }
  );
};

export const deleteAllProductsFromFirebase = async () => {
  try {
    const colRef = collection(db, "products");
    const snapshot = await getDocs(colRef);
    const batchPromises = snapshot.docs.map((d) => deleteDoc(d.ref));
    await Promise.all(batchPromises);
    return true;
  } catch (error) {
    console.error("Error clearing products from Firestore:", error);
    return false;
  }
};


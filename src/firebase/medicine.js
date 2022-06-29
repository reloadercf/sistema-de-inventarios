import { collection, addDoc, query, getDocs, updateDoc, doc, getDoc, arrayRemove, arrayUnion, serverTimestamp } from "firebase/firestore";
import {db,auth} from './firebaseConfig'

export const addMedicine = async (objMedicine)=>{
  const user = auth.currentUser;
    return await addDoc(collection(db, "medicine"), {...objMedicine, timestamp: serverTimestamp(), userAdd:user.email});
}

export const getMedicine = async () =>{
    const q = query(collection(db, "medicine"));
    const data=[]
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
    const el = doc.data()
    const getItemsQuantities=doc.data().items.map(item=>item.cantidad)
    const sumQuantities= getItemsQuantities.reduce((partialSum, a) => partialSum + a, 0)
    const objDataWitID={...el,key:doc.id}
    data.push({...objDataWitID, total:sumQuantities});
    });
    console.log(data)
    return data
}

export const getOneMedicine = async (idDoc) =>{
  const ref = doc(db, "medicine", idDoc);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
  }
}

export const updateAddLotes = async (idDoc, allLotes, newLote) =>{
  const ref = doc(db, "medicine", idDoc);
  return await updateDoc(ref, {
    "lotes":[...allLotes, newLote]
});
}

export const updateAddMedicine = async (idDoc, allMedicines, newMedicine) =>{
  const ref = doc(db, "medicine", idDoc);
  const medicineObj ={
    idMedicine:idDoc,
    lote:newMedicine.Lote,
    caducidad:newMedicine.caducidad._d,
    cantidad:newMedicine.cantidad,
    comentarios:newMedicine.comentarios,
    fechaIngreso:newMedicine.fechaIngreso._d,
    gramaje:newMedicine.gramaje,
    nombreComercial:newMedicine.nombreComercial,
    presentacion:newMedicine.presentacion,
    procedencia:newMedicine.procedencia,
    unidadMedida:newMedicine.unidadMedida,
    cantidadPresentacion:newMedicine.cantidadPresentacion
  }
  return await updateDoc(ref, {
    "items":[...allMedicines, medicineObj]
});
}

export const deleteLote = async(idDocument,element)=>{
  const ref = doc(db, "medicine", idDocument);
  return await updateDoc(ref, {
    lotes: arrayRemove(element)
});
}

export const deleteMedicine = async(idDocument,element)=>{
  console.log(idDocument,element)
  const ref = doc(db, "medicine", idDocument);
  return await updateDoc(ref, {
    items: arrayRemove(element)
});
}

export const updateQuantityMedicine = async(idDocument,element, newElement)=>{
  const ref = doc(db, "medicine", idDocument);
  await updateDoc(ref, {
    items: arrayRemove(element)
  });
  element.cantidad=newElement;
  
  return await updateDoc(ref, {
  items:arrayUnion(element)
  });
}
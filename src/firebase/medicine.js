import { collection, addDoc, query, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import {db} from './firebaseConfig'

export const addMedicine = async (objMedicine)=>{
    return await addDoc(collection(db, "medicine"), objMedicine);
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
    console.log("No such document!");
  }
}

export const updateAddLotes = async (idDoc, allLotes, newLote) =>{
  console.log(idDoc, allLotes, newLote)
  const ref = doc(db, "medicine", idDoc);
  return await updateDoc(ref, {
    "lotes":[...allLotes, newLote]
});
}

export const updateAddMedicine = async (idDoc, allMedicines, newMedicine) =>{
  const ref = doc(db, "medicine", idDoc);
  const medicineObj ={
    lote:newMedicine.Lote,
    caducidad:newMedicine.caducidad._d,
    cantidad:newMedicine.cantidad,
    comentarios:newMedicine.comentarios,
    fechaIngreso:newMedicine.fechaIngreso._d,
    gramaje:newMedicine.gramaje,
    nombreComercial:newMedicine.nombreComercial,
    presentacion:newMedicine.presentacion,
    procedencia:newMedicine.procedencia,
    unidadMedida:newMedicine.unidadMedida
  }
  console.log(medicineObj)
  return await updateDoc(ref, {
    "items":[...allMedicines, medicineObj]
});
}

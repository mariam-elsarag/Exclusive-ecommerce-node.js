export async function getCarts() {
  // const Collection = collection(db, "cart");
  // const data = await getDocs(Collection);
  return data.docs.map((docs) => ({ ...docs.data() }));
}
export async function addToCart(data) {
  // const Collection = collection(db, "cart");

  // Check if the item already exists in the cart
  const q = query(
    Collection,
    where("userId", "==", data.userId),
    where("product_name", "==", data.product_name),
  );
  const querySnapshot = await getDocs(q);
  // for updating quantity if item exists in the cart
  if (!querySnapshot.empty) {
    const docId = querySnapshot.docs[0].id;
    const cartItemRef = doc(Collection, docId);
    try {
      await updateDoc(cartItemRef, {
        quantity: increment(1),
      });
      console.log("Quantity increased for existing item in the cart.");
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await addDoc(Collection, data);
    } catch (error) {
      console.log(error);
    }
  }
}
export async function updateCart(userId, productId, newQuantity, price) {
  const cartCollection = collection(db, "cart");

  try {
    const querySnapshot = await getDocs(
      query(
        cartCollection,
        where("userId", "==", userId),
        where("productId", "==", productId),
      ),
    );

    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      const cartItemRef = doc(cartCollection, docId);

      await updateDoc(cartItemRef, {
        quantity: newQuantity,
        subtotal: newQuantity * price,
      });
      console.log("Cart quantity updated successfully.");
    } else {
      console.log("Cart item not found.");
    }
  } catch (error) {
    console.error("Error updating cart quantity:", error);
  }
}

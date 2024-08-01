import Food from "@/components/food/Food"
async function getFoods(username) {
  const res = await fetch(`/api/foods/${username}`)
  console.log("food received")
  return res.json()
}



export default async function Feed() {
  // Initiate both requests in parallel
  const foods = getFoods()

  return (
    <>
      <h1>{artist.name}</h1>
      {foods.map(food => <Food food={food} />)}
    </>
  )
}
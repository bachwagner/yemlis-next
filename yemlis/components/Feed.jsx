import Food from "@/components/food/Food"


export default async function Feed({foods}) {
  // Initiate both requests in parallel

  return (
    <>
      {foods.map(food => <Food food={JSON.parse(JSON.stringify(food))} />)}
    </>
  )
}
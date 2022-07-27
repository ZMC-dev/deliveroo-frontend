import "./App.css";
// import du package axios
import axios from "axios";
import { useState, useEffect } from "react";


function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

const [cart, setCart] = useState([]);
  //const [price, setPrice] = useState(0);

  //modifier le panier
  const addNewMeal = (meal) => {
    console.log("Vous venez d'ajouter un repas à votre panier");
    const newCart = [...cart];
    newCart.push({title: meal.title, price: meal.price, id: meal.id, quantity: 1});
    setCart(newCart);
  }; 

  console.log("Render App component");

  useEffect(() => {
    // fetchData va faire une requete http
    const fetchData = async () => {
      try {
        //https://zmc-deliveroo-backend.herokuapp.com/
        const response = await axios.get("https://zmc-deliveroo-backend.herokuapp.com/");
        //console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response); 
      }
    };
    fetchData();
  }, []);


  return(
  <div className="container"> {isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div>
      <section className="main-restaurant">
        <div className="main-rest-info">
          <h1>{data.restaurant.name}</h1>
          <p>{data.restaurant.description}</p>
        </div>
        <div className="main-rest-picture">
          <img className="main-pic" src={data.restaurant.picture} alt=""></img>
        </div>   
      </section>

      {data.categories.map((categorie, index)=>{
        return (<section key={index}> 
            <h2 >{categorie.name}</h2>
            <div className="categories-bloc">
              {categorie.meals.map((meal, index) => {
                
                return (
                <div className="meal-card" key={index}
                  onClick={() =>{addNewMeal(meal)}}>

                  <div className="meal-card-left">
                    <h3>{meal.title}</h3>
                    <p>{meal.description}</p>
                    <p>{meal.price}</p>
                  </div>
                  <div className="meal-card-right">
                    <img className="meal-pic" src={meal.picture} alt=""></img>
                  </div>
                </div>
                )

              })}

            </div>

         </section>)
      })}
            <div className="cart">
            <button>Valider mon panier</button>
            <div>{cart.map((meal, index)=> {
              return (
              <div className="cart-items" key={index}>
              
                <button> - </button>
                <p> {meal.quantity} </p>

                <button> + </button>

                <p> {meal.title} </p>
                <p> {meal.price} </p>
              </div>
              )
            
            })}</div>


            <p>hello</p>
            </div>
    </div>  
  )}   
  </div>
  );
}

export default App;






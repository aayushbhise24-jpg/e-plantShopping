
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { addItem } from './CartSlice';
import './ProductList.css';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { id: 1, name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', description: 'A hardy indoor plant for a greener home.', cost: 15 },
      { id: 2, name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg', description: 'An easy-care plant with arching green leaves.', cost: 12 },
      { id: 3, name: 'Peace Lily', image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg', description: 'An elegant plant with beautiful white flowers.', cost: 18 },
      { id: 4, name: 'Boston Fern', image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg', description: 'A lush fern that enjoys a humid environment.', cost: 20 },
      { id: 5, name: 'Rubber Plant', image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg', description: 'A striking plant with broad, glossy leaves.', cost: 17 },
      { id: 6, name: 'Aloe Vera', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg', description: 'A succulent known for its useful gel.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { id: 7, name: 'Lavender', image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=800', description: 'A fragrant plant with calming floral notes.', cost: 20 },
      { id: 8, name: 'Jasmine', image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=800', description: 'A flowering plant known for its sweet fragrance.', cost: 18 },
      { id: 9, name: 'Rosemary', image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg', description: 'An aromatic herb useful in cooking.', cost: 15 },
      { id: 10, name: 'Mint', image: 'https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg', description: 'A refreshing herb for teas and recipes.', cost: 12 },
      { id: 11, name: 'Lemon Balm', image: 'https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg', description: 'A leafy herb with a fresh citrus scent.', cost: 14 },
      { id: 12, name: 'Hyacinth', image: 'https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg', description: 'A flowering plant with fragrant blooms.', cost: 22 },
    ],
  },
  {
    category: 'Insect Repellent Plants',
    plants: [
      { id: 13, name: 'Oregano', image: 'https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg', description: 'An aromatic herb often grown in home gardens.', cost: 10 },
      { id: 14, name: 'Marigold', image: 'https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg', description: 'Bright flowers that add colour to your garden.', cost: 8 },
      { id: 15, name: 'Geranium', image: 'https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg', description: 'A colourful flowering plant with scented leaves.', cost: 20 },
      { id: 16, name: 'Basil', image: 'https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg', description: 'A useful herb for cooking and garden planting.', cost: 9 },
      { id: 17, name: 'Citronella Grass', image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800', description: 'An aromatic grass commonly grown outdoors.', cost: 16 },
      { id: 18, name: 'Catnip', image: 'https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg', description: 'A fragrant herb popular with cats.', cost: 13 },
    ],
  },
  {
    category: 'Medicinal Plants',
    plants: [
      { id: 19, name: 'Aloe Vera', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg', description: 'A succulent whose gel is commonly used in skincare.', cost: 14 },
      { id: 20, name: 'Echinacea', image: 'https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg', description: 'A flowering plant commonly grown in gardens.', cost: 16 },
      { id: 21, name: 'Peppermint', image: 'https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg', description: 'A mint herb with a distinctive aroma.', cost: 13 },
      { id: 22, name: 'Lemon Balm', image: 'https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg', description: 'A lemon-scented herb for the home garden.', cost: 14 },
      { id: 23, name: 'Chamomile', image: 'https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg', description: 'A flowering herb often used to prepare tea.', cost: 15 },
      { id: 24, name: 'Calendula', image: 'https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg', description: 'A bright flowering plant with orange blooms.', cost: 12 },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { id: 25, name: 'ZZ Plant', image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=800', description: 'A resilient houseplant that needs little attention.', cost: 25 },
      { id: 26, name: 'Pothos', image: 'https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg', description: 'A trailing plant that grows well indoors.', cost: 10 },
      { id: 27, name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', description: 'A hardy plant that tolerates occasional missed watering.', cost: 15 },
      { id: 28, name: 'Cast Iron Plant', image: 'https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg', description: 'A robust plant suited to indoor spaces.', cost: 20 },
      { id: 29, name: 'Succulent', image: 'https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg', description: 'A compact plant that stores water in its leaves.', cost: 18 },
      { id: 30, name: 'Aglaonema', image: 'https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg', description: 'A decorative foliage plant for indoor spaces.', cost: 22 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(true);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const handleHome = (event) => {
    event.preventDefault();
    if (onHomeClick) onHomeClick();
  };

  return (
    <div className="shop-page">
      <nav className="navbar">
        <a className="brand" href="/" onClick={handleHome}>
          <span className="brand-icon">🌿</span>
          <span>
            <strong>Paradise Nursery</strong>
            <small>Where Green Meets Serenity</small>
          </span>
        </a>

        <div className="nav-links">
          <button onClick={() => { setShowPlants(true); setShowCart(false); }}>
            Plants
          </button>
          <button className="cart-link" onClick={() => setShowCart(true)}>
            🛒 Cart <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : showPlants ? (
        <main className="products-page">
          <header className="products-header">
            <h1>Our Plants</h1>
            <p>Bring home a little more green.</p>
          </header>

          {plantsArray.map((group) => (
            <section className="plant-category" key={group.category}>
              <h2>{group.category}</h2>
              <div className="product-grid">
                {group.plants.map((plant) => {
                  const inCart = cartItems.some((item) => item.id === plant.id);

                  return (
                    <article className="plant-card" key={plant.id}>
                      <img
                        className="plant-image"
                        src={plant.image}
                        alt={plant.name}
                        loading="lazy"
                      />
                      <div className="plant-details">
                        <h3>{plant.name}</h3>
                        <p>{plant.description}</p>
                        <strong className="plant-price">
                          ${plant.cost.toFixed(2)}
                        </strong>
                        <button
                          className="add-to-cart-button"
                          onClick={() => handleAddToCart(plant)}
                          disabled={inCart}
                        >
                          {inCart ? 'Added to Cart' : 'Add to Cart'}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      ) : null}
    </div>
  );
}

export default ProductList;

import './Cart.css';


const Cart = ({selectedCourses}) => (
  <div className="shoppingCart">
    {
      selectedCourses.length === 0
      ? <h2>
        <p>The cart is empty</p>
        <p>Click on a course to add it to your cart</p>
      </h2>
      : (
        <div>
          <h2>SHOPPING CART</h2>
          {selectedCourses.map((course) => (
            <div className="card-body" key={course.id}>
              <h5 className="card-title">
                {course.term} CS {course.number}
              </h5>
              <p className="card-text">{course.title}</p>
              <p className="card-text">{course.meets}</p>
            </div>
          ))}
        </div>
      )
    }
  </div>
);

export default Cart;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar, FaChevronLeft } from "react-icons/fa";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { toast } from "react-toastify";
import "./ProductDetailsView.css";

const ReviewForm = ({ review, setReview, handleReviewSubmit }) => {
    const { auth } = useGlobalContext();
    const user = auth.state.user;

    const isLoggedIn = !!user?.id;

    if (!isLoggedIn) {
        return <p className="login-warning">You must be logged in to leave a review.</p>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleReviewSubmit(e, {
            ...review,
            user: user.id,
        });
    };

    return (
        <div className="review-form">
            <h3>Add Your Review</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Rating</label>
                    <div className="star-rating">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className={i < review.rating ? "selected" : ""}
                                onClick={() =>
                                    setReview({ ...review, rating: i + 1 })
                                }
                            />
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Comment</label>
                    <textarea
                        rows={5}
                        value={review.comment}
                        onChange={(e) =>
                            setReview({ ...review, comment: e.target.value })
                        }
                        required
                    />
                </div>

                <button type="submit" className="submit-review">
                    Submit Review
                </button>
            </form>
        </div>
    );
};

const ProductDetailsView = () => {
    const { id } = useParams();
    const { store } = useGlobalContext();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [review, setReview] = useState({
        rating: 0,
        comment: ""
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}/get-product`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
                toast.error("Failed to load product details");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleReviewSubmit = async (e, reviewData) => {
        e.preventDefault();
        try {
            console.log(reviewData);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/${product._id}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData)
            });
            console.log("SDLFKSDOIFJSDf");
            console.log(response);

            if (!response.ok) {
                throw new Error("Failed to post review");
            }

            const updatedProduct = await response.json();
            setProduct(updatedProduct);
            toast.success("Review submitted successfully!");
            setReview({ rating: 0, comment: "" });
        } catch (error) {
            console.error("Error submitting review:", error.message);
            toast.error("Failed to submit review");
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (!product) return <div className="not-found">Product not found</div>;

    const isInCart = store.state.cart.some(item => item._id === product._id);

    return (
        <div className="product-details-page">
            <button className="back-button" onClick={() => navigate(-1)}>
                <FaChevronLeft /> Back to Products
            </button>

            <div className="product-details-container">
                <div className="product-images">
                    <div className="main-image">
                        <img src={product.product_image} alt={product.name} />
                    </div>
                </div>

                <div className="product-info">
                    <h1>{product.name}</h1>

                    <div className="price-rating">
                        <span className="price">${product.price.toFixed(2)}</span>
                        {/* {product.price_before && (
                            <span className="price-before">${product.price_before.toFixed(2)}</span>
                        )} */}
                        <div className="rating">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={i < product.rating ? 'filled' : 'empty'}
                                />
                            ))}
                            <span>({product.times_bought || 0} purchases)</span>
                        </div>
                    </div>

                    <p className="description">{product.description}</p>
                    {product.tags && (
                        <div className="product-tags">
                            <h3>Tags</h3>
                            <p>{product.tags}</p>
                        </div>
                    )}

                    <div className="action-buttons">
                        {isInCart ? (
                            <button
                                className="remove-from-cart"
                                onClick={() => store.removeFromCart(product._id)}
                            >
                                Remove from Cart
                            </button>
                        ) : (
                            <button
                                className="add-to-cart"
                                onClick={() => {
                                    if (store.state.cartQuantity > 10) {
                                        toast.warning("You can only add 10 items to cart");
                                        return;
                                    }
                                    store.addToCart(product._id);
                                }}
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>

                <ReviewForm
                    review={review}
                    setReview={setReview}
                    handleReviewSubmit={handleReviewSubmit}
                />

                {/* Show Reviews */}
                <div className="product-reviews">
                    <h3>Customer Reviews</h3>
                    {product.reviews?.length === 0 ? (
                        <p>No reviews yet.</p>
                    ) : (
                        <ul className="review-list">
                            {product.reviews.map((r, index) => (
                                <li key={index} className="review-item">
                                    <div className="review-header">
                                        <strong className="review-username">{r.user}</strong>
                                        <span className="review-date">{new Date(r.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="review-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={i < r.rating ? 'filled' : 'empty'} />
                                        ))}
                                    </div>
                                    <p className="review-comment">"{r.comment}"</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsView;
import { resolveProductRating, resolveReviewCount } from '../services/productService';

export default function ReviewStars(props) {
  var rating = props.rating;
  var reviewCount = props.reviewCount;
  var product = props.product;
  var value = typeof rating === 'number' ? rating : resolveProductRating(product);
  var count = typeof reviewCount === 'number' ? reviewCount : resolveReviewCount(product);
  var filledStars = Math.round(value);

  if (!value) {
    return (
      <div className="review-row">
        <span className="muted-text">New item</span>
        <span className="muted-text">No written reviews yet</span>
      </div>
    );
  }

  return (
    <div className="review-row">
      <div className="star-strip" aria-label={'Rated ' + value + ' out of 5'}>
        {Array.from({ length: 5 }).map(function mapStar(_, index) {
          return (
            <span key={index} className={index < filledStars ? 'star-filled' : 'star-empty'}>
              ★
            </span>
          );
        })}
      </div>
      <span className="muted-text">
        {value.toFixed(1)} {count ? '(' + count + ')' : ''}
      </span>
    </div>
  );
}

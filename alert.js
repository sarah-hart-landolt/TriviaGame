/*
 This component holds the function to set the proper alert to judge if an answer is correct/ incorrect
*/

export const alert = (variableName) => {
    if (variableName === "correct") {
      return `
      <div class="alert alert-success" role="alert">
    <h4 class="alert-heading">Well done!</h4>
    <hr>
    <p>Excellent choice. You're a smart cookie, so be happy!.</p>
    <img src="./images/happy.png" alt="Happy Emotion Sarah Hart Landolt painting" width="115" height="150">
    </div>
  `;
    } else {
      return `
    <div class="alert alert-warning" role="alert">
  <h4 class="alert-heading">Oops!</h4>
  <hr>
  <p>Incorrect Answer. But don't be too frustrated! </p>
  <img src="./images/frustrated.png" alt="Frustrated Emotion Sarah Hart Landolt painting" width="115" height="150">
</div>
`;
    }
  };

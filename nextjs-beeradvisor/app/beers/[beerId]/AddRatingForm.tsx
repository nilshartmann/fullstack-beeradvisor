"use client";
import { useState } from "react";
import styles from "./Form.module.css";
import { addRating } from "@/app/beers/[beerId]/actions";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type RatingFormProps = {
  beerName: string;
  beerId: string;
};

export default function RatingForm({ beerName, beerId }: RatingFormProps) {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async () => {
    const response = await addRating({
      username,
      comment,
      stars: parseInt(stars),
      beerId,
    });

    if (response.result === "success") {
      setUsername("");
      setComment("");
      setStars("");

      setErrors({});

      return;
    }

    setErrors(response.errors);
  };

  const buttonEnabled = !!username && !!stars && !!comment;

  return (
    <div className={styles.Form}>
      <form action={onSubmit}>
        <fieldset>
          <div>
            <label>Your name:</label>{" "}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {errors?.username && (
            <p className={styles.error}>{errors.username}</p>
          )}
          <div>
            <label>Your rating (1-5):</label>{" "}
            <input
              type="number"
              min="1"
              max="5"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
            />
          </div>
          {errors?.stars && <p className={styles.error}>{errors.stars}</p>}
          <div>
            <label>Your comment:</label>{" "}
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          {errors?.comment && <p className={styles.error}>{errors.comment}</p>}
          <SubmitButton disabled={!buttonEnabled}>
            <>Leave rating for {beerName}</>
          </SubmitButton>
        </fieldset>
      </form>
    </div>
  );
}

type SubmitButtonProps = {
  disabled: boolean;
  children: React.ReactNode;
};

/**
 * We need an own button component here, as useFormStatus only works if it is called
 * INSIDE a form
 * https://gist.github.com/JLarky/190bab52ff13c44f9420523d1792fbf0
 * @constructor
 */
function SubmitButton({ children, disabled }: SubmitButtonProps) {
  const formStatus = useFormStatus();
  console.log("formStatus", formStatus.pending);

  return (
    <button type={"submit"} disabled={disabled || formStatus.pending}>
      {formStatus.pending ? <>Saving </> : children}
    </button>
  );
}

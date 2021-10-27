import React from "react";

const Total = ({course}) => {
  const total = course.parts.reduce((total, num) => {
    return total + num.exercises
   }, 0)
  return (
      <p>Total of {total} exercises </p>
  )
}
export default Total


const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className="flex flex-col items-center">
      <p>{value}</p>
      <span className="uppercase ">{type}</span>
    </div>
  )
}

export default DateTimeDisplay

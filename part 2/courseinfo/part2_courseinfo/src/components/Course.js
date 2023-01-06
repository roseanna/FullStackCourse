const Header = ({text}) => {
  return <h1>{text}</h1>
}

const Content = ({part}) => {
  return <div>{part.name} {part.exercises}</div>
}

const SumExercises = ({course}) => {
  const total = course.parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return <h3>total of {total} exercises</h3>
}

const Course = ({course}) => {
  console.log(course)
  return (
    <>
      <Header text={course.name} />
      {course.parts.map((part) => <Content key={part.id} part={part}/>)}
      <SumExercises course={course}/>
    </>
  )
}

export default Course;
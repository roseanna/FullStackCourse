const Header = (props) => ( <h1>{props.course}</h1> )
const Part = (props) => ( <p>{props.part.name} {props.part.exercises}</p> )

const Content = (props) => {
  const [part1, part2, part3] = props.parts

  return (
    <div> 
      <Part part={part1}/>
      <Part part={part2}/>
      <Part part={part3}/>
    </div>
  )
}

const Total = (props) => {
  const total = props.parts.reduce((total, part) => {
    return total + part.exercises
  }, 0)

  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development', 
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>    
  )
}

export default App;

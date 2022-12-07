import { useSelector } from 'react-redux'

const Notification = () => {
  // przeczytaj ten stan z tego reducera
  const notification = useSelector(state => state.notifications)
  
  // dzieki temu mozemy uzyc kazdej akcji z reducera
  //const dispatch = useDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
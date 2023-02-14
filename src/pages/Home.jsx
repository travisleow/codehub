import { useState, useEffect } from 'react'
import { useGlobalContext } from '../context/ContextProvider'
import Header from '../components/Header'
import Card from '../components/Card'

const Home = () => {
  const { setName, setLanguage } = useGlobalContext();
  const [classes, setClasses] = useState(undefined);

  const getClasses = async () => {
    const storage = localStorage.getItem("classes");
    if (storage) {
      const classes = JSON.parse(storage);
      setClasses(classes);
    }
  }

  useEffect(() => {
    setLanguage(undefined)
    setName(undefined);
    getClasses();
  }, [])

  return (
    <div className="container mx-auto h-screen flex flex-col gap-12">
        <Header getClasses={getClasses} />
        {classes && <Card classes={classes} getClasses={getClasses} />}
    </div>
  )
}

export default Home
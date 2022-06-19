
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getCardList } from '../fakeApis/data'
import styles from "./Oracle.module.scss";
import vector from '../icons/vector.svg'
import Spinner from "../components/Spinner";

const Oracle = () => {
  const [selectedId, setSelectedId] = useState()
  const [loading, setLoading] = useState(false)
  const [list, setList]: [Array<any>, Function] = useState([])

  const getData = async () => {
    setLoading(true)
    const res = await getCardList()
    setLoading(false)
    setList(res)
  }

  const onItemClick = (id: any) => {
    setSelectedId(id)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>
          <div className={styles.icon}>
            <img alt="vector" src={vector}/>
          </div>
          <div className={styles.text}>
            Oracle
          </div>
        </div>
        <div className={styles.list}>
          {
            loading &&
            <Spinner />
          }
          {
            list && list.map((item: any) => {
              return (
                <Card key={item.id} data={item} selected={item.id === selectedId} onClick={() => onItemClick(item.id)}/>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Oracle
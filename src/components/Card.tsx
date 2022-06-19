
import styles from './Card.module.scss'
import Status from './Status'
import coin from '../icons/coin.svg'

const Card = (props: { data: any, selected: any, onClick: any }) => {
  const { data, selected, onClick } = props
  return (
    <div className={`${styles.container} ${selected ? styles.selected : ''}`} onClick={onClick}>
      <div className={styles.top}>
        <div className={styles.title}>
          {data.symbol}
        </div>
        <div className={styles.status}>
          <Status status={data.status} />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <img alt='coin' src={coin} />
        </div>
        <div className={styles.right}>
          <div className={styles.money}>$ 3,412,025.12</div>
          <div className={styles.date}>End: 08/Sept/2022 16:00</div>
        </div>
      </div>
    </div>
  )
}

export default Card
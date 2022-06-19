import active from '../icons/active.svg'
import terminated from '../icons/terminated.svg'
import suspended from '../icons/suspended.svg'
import styles from './Status.module.scss'

const Status = (props: { status: any }) => {
  const { status } = props
  return (
    <div className={styles.container}>
      {
        status === 1 &&
        <>
          <div className={styles.icon}>
            <img src={active} alt='active' />
          </div>
          <div className={styles.active}>Active</div>
        </>
      }
      {
        status === 2 &&
        <>
          <div className={styles.icon}>
            <img src={terminated} alt='terminated' />
          </div>
          <div className={styles.terminated}>Terminated</div>
        </>
      }
      {
        status === 3 &&
        <>
          <div className={styles.icon}>
            <img src={suspended} alt='suspended' />
          </div>
          <div className={styles.suspended}>Suspended</div>
        </>
      }
    </div>
  )
}

export default Status
import { AnimatePresence, motion } from 'framer-motion'
import { $favorites, $favoritesFromLs } from '@/context/favorites'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import styles from '@/styles/favorites/index.module.scss'
import { FavoritesListItem } from './FavoritesListItem'
import { basePropsForMotion } from '@/const/motion'

const FavoritesList = () => {
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLs)

  return (
    <AnimatePresence>
      {currentFavoritesByAuth.map((item) => (
        <motion.li
          {...basePropsForMotion}
          key={item._id || item.clientId}
          className={styles.favorites__list__item}
        >
          <FavoritesListItem item={item} />
        </motion.li>
      ))}
    </AnimatePresence>
  )
}

export { FavoritesList }

import { motion } from 'framer-motion'
import Link from 'next/link'
import { IComparisonLinksListProps } from '@/types/comparison'
import styles from '@/styles/comparison/index.module.scss'
import { basePropsForMotion } from '@/const/motion'

const ComparisonLinksList = ({
  links,
  className,
}: IComparisonLinksListProps) => (
  <motion.ul className={`list-reset ${className}`} {...basePropsForMotion}>
    {links.map((item, i) => (
      <li
        key={`${item.title}-${item.itemsCount}-${i}`}
        className={`${item.isActive ? styles.active : ''}`}
      >
        <Link href={item.href}>
          <span>{item.title}</span>
          <span>{item.itemsCount}</span>
        </Link>
      </li>
    ))}
  </motion.ul>
)

export default ComparisonLinksList

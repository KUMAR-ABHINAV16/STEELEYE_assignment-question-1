import styles from "./ListRow.module.css";

const ListCell = ({ children, onClick, rowId }) => {

  return <tr onClick={() => onClick(rowId)} className={styles.cell}>{children}</tr>;
};

export default ListCell;

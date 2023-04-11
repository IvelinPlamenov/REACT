import styles from "./User.module.css"
export const User = ({
    id,username,email,role,FirstName,LastName,Age,
    onDeleteClick,
    onEditClick,
    onInfoClick
}) => {

    return(
        <>
            <tr >
                <td>{username} </td>
                <td>{id}</td>
                <td>{FirstName}</td>
                <td>{LastName}</td>
                <td>{email}</td>
                <td>{Age}</td>
                <td>{role}</td>
                <td className={styles["delete"]}>
                    <button className={styles["delete-btn"]} title="Delete" onClick={() => {onDeleteClick(id)}} >
                        <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em" >
                            <path d="M11 1.5v1h3.5a.5.5 0 010 1h-.538l-.853 10.66A2 2 0 0111.115 16h-6.23a2 2 0 01-1.994-1.84L2.038 3.5H1.5a.5.5 0 010-1H5v-1A1.5 1.5 0 016.5 0h3A1.5 1.5 0 0111 1.5zm-5 0v1h4v-1a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5zM4.5 5.029l.5 8.5a.5.5 0 10.998-.06l-.5-8.5a.5.5 0 10-.998.06zm6.53-.528a.5.5 0 00-.528.47l-.5 8.5a.5.5 0 00.998.058l.5-8.5a.5.5 0 00-.47-.528zM8 4.5a.5.5 0 00-.5.5v8.5a.5.5 0 001 0V5a.5.5 0 00-.5-.5z" />
                        </svg>
                    </button>
                </td>
                <td className={styles["update"]}>
                    <button className={styles["edit-btn"]} title="Edit" onClick={() => {onEditClick(id)}} >
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen-to-square"
                            className="svg-inline--fa fa-pen-to-square" role="img" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 532 512">
                            <path fill="currentColor"
                                d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z">
                            </path>
                        </svg>
                    </button>
                </td>
                <td className={styles["details"]}>
                    <button className={styles["info-btn"]} title="Info" onClick={() => {onInfoClick(id)}} >
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info"
                            className="svg-inline--fa fa-info" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="-150 0 512 612">
                            <path fill="currentColor"
                                d="M160 448h-32V224c0-17.69-14.33-32-32-32L32 192c-17.67 0-32 14.31-32 32s14.33 31.1 32 31.1h32v192H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32S177.7 448 160 448zM96 128c26.51 0 48-21.49 48-48S122.5 32.01 96 32.01s-48 21.49-48 48S69.49 128 96 128z">
                            </path>
                        </svg>
                    </button>
                </td>
            </tr> 
        </>

          
       
        
    )
}

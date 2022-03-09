import styles from './alert.module.css'

function getStyleFromType(type){ 
    return{
        "success":styles.success,
        "error":styles.error,
    }[type]
}


export default function Alert( { children, type } ) { 

    return ( 
        <div className={ getStyleFromType(type) } >
            {children}
        </div>
    )
}
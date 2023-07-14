import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

//STYLES

const styles={
removeItemContainer:"w-full h-full absolute z-[999] top-0 bg-[#00000062]",
removeItem:"rounded-[.3em] fixed inset-0 m-auto w-[30%] h-fit bg-white aspect-[2/1] text-center p-4",
btn:"flex scale-x-[1.5] scale-y-[1.6] text-[.7rem]"
}

export const RemoveItem = ({setIsRemoveBox}) => {
    return (
        <div className={styles.removeItemContainer}>            
            <div className={styles.removeItem}>
            <CloseRoundedIcon 
                className='absolute right-[-2em] scale-[1.8] text-white top-0 cursor-pointer'
                onClick={()=> setIsRemoveBox(false)}
                />
                <h3 className='text-[1.1rem]'>Remove Item</h3>
                <span className='text-[#808080] text-base'>Are you sure you want to remove this item?</span>
                <Stack spacing={2} direction="row" className='w-full justify-between px-5 h-[50%] items-end'>
                    <Button className={styles.btn}  variant="outlined" onClick={()=>setIsRemoveBox(false)}>CANCEL</Button>
                    <Button className={styles.btn}  variant="outlined">REMOVE</Button>
                </Stack>
            </div>
        </div>
    )
}
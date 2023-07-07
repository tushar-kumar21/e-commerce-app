import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const RemoveItem = ({setIsRemoveBox}) => {
    return (
        <div className="remove-item-container">            
            <div className="remove-item">
            <CloseRoundedIcon sx={{
                position:'absolute', 
                right:'-2em', 
                transform:'scale(1.8)', 
                color:'#fff', 
                top:'0', 
                cursor:'pointer'}} 
                onClick={()=> setIsRemoveBox(false)}
                />
                <h3>Remove Item</h3>
                <span>Are you sure you want to remove this item?</span>
                <Stack spacing={2} direction="row" >
                    <Button variant="outlined" onClick={()=>setIsRemoveBox(false)}>CANCEL</Button>
                    <Button variant="contained">REMOVE</Button>
                </Stack>
            </div>
        </div>
    )
}
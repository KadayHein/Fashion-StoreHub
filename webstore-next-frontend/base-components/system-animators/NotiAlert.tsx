import { Alert, Snackbar } from '@mui/material'
import React from 'react'

type NotiProps = {
  notibox : {status: string, show: boolean, timeout: number, message: string},
  setNotibox : React.Dispatch<React.SetStateAction<{status: string, show: boolean, timeout: number, message: string}>>
}

export default function NotiAlert({notibox, setNotibox} : NotiProps) {

    const getBorderColorOnSeverity = () => {
        switch (notibox.status) {
          case "success": return "green";
          case "error": return "red";
          case "warning": return "orange";
          case "info": return "blue";
          default: return "gray"; 
        }
      };

      const closeNoti = () => {
        setNotibox({
            status: notibox.status,
            show:false, 
            timeout: notibox.timeout, 
            message: notibox.message
        })
      }

  return (
          <Snackbar open={notibox.show} autoHideDuration={notibox.timeout} onClose={closeNoti}
            anchorOrigin={{ vertical: "top", horizontal: "center" }} 
            sx={{  
                zIndex: 1400, // exceed over modal backdrop's zIndex
            }}>
            <Alert
            onClose={closeNoti}
            severity={notibox.status as "success" | "info" | "warning" | "error"}
            variant="standard"
            sx={{ width: '100%' , border: `2px solid ${getBorderColorOnSeverity()}` }}
            >
            {notibox.message}
            </Alert>
        </Snackbar>
  )
}

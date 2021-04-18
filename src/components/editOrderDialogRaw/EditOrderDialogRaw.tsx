import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { orderList } from '../../mocks/constData';

export interface EditOrderDialogRawProps {
    classes: Record<'paper', string>;
    id: string;
    keepMounted: boolean;
    orderMsg: string;
    orderId: number;
    open: boolean;
    onClose: (value?: string) => void;
  }
  
export function EditOrderDialogRaw(props: EditOrderDialogRawProps) {
    const { onClose, orderMsg: orderMsgProp, orderId: orderIdProp, open, ...other } = props;
    const [ orderMsg, setOrderMsg ] = React.useState<string>(orderMsgProp);
    const [ orderId, setOrderId ] = React.useState<number>(orderIdProp);
  
    const handleEntering = () => {
      console.log('handleEntering orderMsgProp', orderMsgProp);
      console.log('handleEntering orderIdProp', orderIdProp);
      
      if (orderMsgProp) {
        setOrderMsg(orderMsgProp);
      } else {
        setOrderMsg('');
      }
      setOrderId(orderIdProp);
      console.log('handleEntering orderId', orderId);
      
    };
  
    const handleCancel = () => {
      onClose('sub com handleCancel');
    };
  
    const handleOk = () => {
      console.log('handleOk orderMsg', orderMsg);
      const getOrderIndex = orderList.findIndex((order) => {
        return order.Id === orderIdProp
      })
      console.log('handleOk getOrderIndex', getOrderIndex);
      
      orderList[getOrderIndex].Message = orderMsg
      console.log('handleOk orderList', orderList);
      
      onClose('sub com handleOk');
  
    };
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setOrderMsg((event.target as HTMLInputElement).value);
    };
  
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={handleEntering}
        aria-labelledby="edit-order-dialog-title"
        open={open}
        {...other}
      >
        <DialogTitle id="edit-order-dialog-title">編輯醫囑</DialogTitle>
        <DialogContent dividers>
          <TextField
              autoFocus
              margin="dense"
              id="order-text"
              label="醫囑內容"
              type="text"
              fullWidth
              onChange={handleChange}
              value={orderMsg}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel} color="primary">
            取消
          </Button>
          <Button onClick={handleOk} color="primary">
            確定
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
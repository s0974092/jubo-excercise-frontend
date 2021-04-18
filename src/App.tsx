import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ListSubheader from '@material-ui/core/ListSubheader';
import './App.css';
import { EditOrderDialogRaw } from './components/editOrderDialogRaw/EditOrderDialogRaw';
import { orderList, patientList, useStyles } from './mocks/constData';

function App() {
  const classes = useStyles();
  const [ open, setOpen ] = React.useState<boolean>(false);
  const [ orderMsg, setOrderMsg ] = React.useState<string>('');
  const [ orderId, setOrderId ] = React.useState<number>(0);

  const handleClickListItem = (orderId: number | null) => () => {
    setOpen(true);
    console.log('handleClickListItem orderId', orderId);
    const getOrderMsg = orderList.find((order) => {
      return order.Id === orderId
    })?.Message
    console.log('handleClickListItem getOrderMsg', getOrderMsg);
    
    if (getOrderMsg) {
      setOrderMsg(getOrderMsg);
    } else {
      setOrderMsg('');
    }
    if (orderId)
      setOrderId(orderId);
  };

  const handleClose = (receiveSubComValue?: string) => {
    setOpen(false);
    console.log('receiveSubComValue', receiveSubComValue);
  };

  return (
    <>
      <List subheader={<ListSubheader>住民與醫囑</ListSubheader>} className={classes.root}>
        {patientList.map((patient) => {
          const patientId = `patient-id-${patient.Id}`;
          return (
            <ListItem key={patient.Id}>
              <ListItemText id={patientId} primary={patient.Name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="編輯" onClick={handleClickListItem(patient.OrderId)}>
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <EditOrderDialogRaw
        classes={{
          paper: classes.paper,
        }}
        id="order-edit"
        keepMounted
        open={open}
        onClose={handleClose}
        orderMsg={orderMsg}
        orderId={orderId}
      />
    </>
  );
}

export default App;

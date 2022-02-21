import React, { useEffect, useState } from 'react';
import { Table, Card, Image, Button, Spinner } from 'react-bootstrap';

import FirestoreService from '../utils/services/FirestoreService';
import logo from '../assets/logo.png';

function Menu(props) {

    const [menuItems, setMenuItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        FirestoreService.getAllMenuItems().then((response) => {
            setIsLoading(false);
            setMenuItems(response._delegate._snapshot.docChanges);
        }).catch((e) => {
            setIsLoading(false);
            alert("Error occured while fetching the menu item. " + e);
        })
    }, [])

    return (
        <>
            {(isLoading === true) && <Spinner animation="border" variant="secondary" />}
            <Card style={{ margin: 24 }}>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <div className="align-items-center" style={{ marginRight: 8 }}>
                        <Image src={logo} style={{ width: 150 }} />
                        <p style={{ marginTop: 8, fontSize: 12, color: '#A1A1A1' }}>Karlavagen 108, Stockholm </p>
                    </div>
                    <Button style={{ backgroundColor: '#BD2B2B', borderWidth: 0, }}>Place Order</Button>
					
                </Card.Header>
                <Card.Body>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item Name</th>
                                <th>Category</th>
                                <th>Price (SEK)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(menuItems) && (menuItems.map((menuItem, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{menuItem.doc.data.value.mapValue.fields.itemName.stringValue}</td>
                                    <td>{menuItem.doc.data.value.mapValue.fields.itemCategory.stringValue}</td>
                                    <td>{menuItem.doc.data.value.mapValue.fields.itemPrice.doubleValue ? menuItem.doc.data.value.mapValue.fields.itemPrice.doubleValue : menuItem.doc.data.value.mapValue.fields.itemPrice.integerValue}</td>
                                </tr>
                            )))}
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                    <p style={{ marginTop: 8, fontSize: 12, color: '#A1A1A1' }}>© 2022 SaltNPepper</p>
                    <p style={{ marginTop: 8, fontSize: 12, color: '#A1A1A1' }}><a href="/login">Admin Login</a> • <a href="#">Privacy Policy</a> • <a href="#">Directions</a> • <a href="#">Contact Us</a></p>
                </Card.Footer>
            </Card>
        </>
    );
}

export default Menu;
import React, { useState, useEffect } from 'react';
import { Table, Card, Image, Button, Modal, Form, FloatingLabel, Spinner } from 'react-bootstrap';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import logo from '../assets/logo.png';

import FirestoreService from '../utils/services/FirestoreService';
import NotLoggedInView from '../components/NoLoggedInView';


function Dashboard(props) {

    const [user, setUser] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [menuCategories, setMenuCategories] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [currentMenuItem, setCurrentMenuItem] = useState({
        "itemName": '',
        "itemCategory": '',
        "itemPrice": 0
    });
    const [currentMenuItemId, setCurrentMenuItemId] = useState("");

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    })

    function fetchMenuCategories() {
        setIsLoading(true);
        FirestoreService.getAllMenuCategories().then((response) => {
            setIsLoading(false);
            setMenuCategories(response._delegate._snapshot.docChanges);
        }).catch((e) => {
            setIsLoading(false);
            alert("Error occured while fetching the menu categories. " + e);
        })
    }

    function fetchMenuItems() {
        setIsLoading(true);
        FirestoreService.getAllMenuItems().then((response) => {
            setIsLoading(false);
            setMenuItems(response._delegate._snapshot.docChanges);
        }).catch((e) => {
            setIsLoading(false);
            alert("Error occured while fetching the menu item. " + e);
        })
    }

    useEffect(() => {
        if (user !== null) {
            if (menuCategories.length <= 0) {
                fetchMenuCategories();
            }
            fetchMenuItems();
        }
    }, [user])

    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [addEditFormType, setAddEditFormType] = useState('Add'); //Add, Edit
    const [validated, setValidated] = useState(false);

    const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);

    const handleModalClose = () => {
        setShowAddEditForm(false);
        setShowDeleteDialogue(false);
        setCurrentMenuItemId("");
        setAddEditFormType("Add");
        setCurrentMenuItem({ "itemName": '', "itemCategory": '', "itemPrice": 0 })
        setIsLoading(false);
    }

    const handleAddEditFormSubmit = (e) => {
        e.preventDefault();
        const { itemName, itemCategory, itemPrice } = e.target.elements;

        if (itemPrice.value && itemName.value) {
            if (addEditFormType === "Add") {
                setIsLoading(true);
                FirestoreService.AddNewMenuItem(itemName.value, itemCategory.value, itemPrice.value).then(() => {
                    alert(`${itemName.value} is successfully added to the menu.`)
                    handleModalClose();
                    window.location.reload(false);
                }).catch((e) => {
                    alert("Error occured: " + e.message);
                    setIsLoading(false);
                })
            } else if (addEditFormType === "Edit") {
                setIsLoading(true);
                FirestoreService.UpateMenuItem(currentMenuItemId, itemName.value, itemCategory.value, itemPrice.value).then(() => {
                    alert(`${itemName.value} is successfully updated.`);
                    handleModalClose();
                    window.location.reload(false);
                }).catch((e) => {
                    alert("Error occured: " + e.message);
                    setIsLoading(false);
                })
            }
        }
        setValidated(true)
    }

    const handleMenuItemDelete = () => {
        setIsLoading(true);
        FirestoreService.DeleteMenuItem(currentMenuItemId).then(() => {
            alert(`Deletion Successful`);
            handleModalClose();
            window.location.reload(false);
        }).catch((e) => {
            alert("Error occured: " + e.message);
            setIsLoading(false);
        })
    }

    return (
        <>
            {/* <h1>You're not logged in. Please <a href="/login">login</a> first then come to dashboard.</h1> */}
            {(user === null) && <NotLoggedInView />}
            {(isLoading === true) && <Spinner animation="border" variant="secondary" />}
            {(user !== null) && <>
                {/* Add/Edit Form START */}
                <Modal show={showAddEditForm} onHide={handleModalClose}>
                    <Form noValidate validated={validated} onSubmit={handleAddEditFormSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>{(addEditFormType === 'Add') ? 'Add Menu Item' : 'Edit'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FloatingLabel controlId="itemName" label="Item Name" className="mb-3" >
                                <Form.Control required type='text' placeholder='Enter item name' size='md' value={currentMenuItem?.itemName} onChange={(e) => {
                                    setCurrentMenuItem({
                                        "itemName": (e.target.value) ? e.target.value : '',
                                        "itemCategory": currentMenuItem?.itemCategory,
                                        "itemPrice": currentMenuItem?.itemPrice
                                    })
                                }} />
                                <Form.Control.Feedback type='invalid'>Item name is required</Form.Control.Feedback>
                            </FloatingLabel>

                            <FloatingLabel controlId="itemCategory" label="Item Category" className="mb-3" >
                                <Form.Select value={currentMenuItem?.itemCategory} onChange={(e) => {
                                    setCurrentMenuItem({
                                        "itemName": currentMenuItem?.itemName,
                                        "itemCategory": e.target.value,
                                        "itemPrice": currentMenuItem?.itemPrice
                                    })
                                }}>
                                    {(menuCategories) && (menuCategories.map((menuCategory, index) => (
                                        // catNum.integerValue
                                        <option key={index} value={menuCategory.doc.data.value.mapValue.fields.catName.stringValue}>
                                            {menuCategory.doc.data.value.mapValue.fields.catName.stringValue}</option>
                                    )))}
                                </Form.Select>
                            </FloatingLabel>

                            <FloatingLabel controlId="itemPrice" label="Price (SEK)" className="mb-3">
                                <Form.Control required type='text' placeholder='Enter item price' size='md' value={currentMenuItem?.itemPrice} onChange={(e) => {
                                    setCurrentMenuItem({
                                        "itemName": currentMenuItem?.itemName,
                                        "itemCategory": currentMenuItem?.itemCategory,
                                        "itemPrice": e.target.value
                                    })
                                }} />
                                <Form.Control.Feedback type='invalid'>Item Price is required</Form.Control.Feedback>
                            </FloatingLabel>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">{(addEditFormType === 'Add') ? 'Add' : 'Update'}</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                {/* Add/Edit Form END */}

                {/* Delete Confirmation Dialogue START */}
                <Modal show={showDeleteDialogue} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete {currentMenuItem.itemName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete {currentMenuItem.itemName}?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
                        <Button variant="danger" onClick={handleMenuItemDelete}>Yes, Delete</Button>
                    </Modal.Footer>
                </Modal>
                {/* Delete Confirmation Dialogue END */}

                <Card style={{ margin: 24 }}>
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <div className="align-items-center" style={{ marginRight: 8 }}>
                            <Image src={logo} style={{ width: 80 }} />
                            <h4 style={{ marginTop: 8, }}>Dashboard</h4>
                        </div>
                        <Button style={{ backgroundColor: '#000', borderWidth: 0, }} onClick={() => {
                            setShowAddEditForm(true);
                        }}>Add New Item</Button>
                    </Card.Header>
                    <Card.Body>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Item Name</th>
                                    <th>Category</th>
                                    <th>Price (SEK)</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(menuItems) && (menuItems.map((menuItem, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{menuItem.doc.data.value.mapValue.fields.itemName.stringValue}</td>
                                        <td>{menuItem.doc.data.value.mapValue.fields.itemCategory.stringValue}</td>
                                        <td>{menuItem.doc.data.value.mapValue.fields.itemPrice.doubleValue ? menuItem.doc.data.value.mapValue.fields.itemPrice.doubleValue : menuItem.doc.data.value.mapValue.fields.itemPrice.integerValue}</td>
                                        <td>
                                            <Button variant='primary' onClick={() => {
                                                setCurrentMenuItemId(menuItem.doc.key.path.segments[menuItem.doc.key.path.segments.length - 1])
                                                setCurrentMenuItem({
                                                    "itemName": menuItem.doc.data.value.mapValue.fields.itemName.stringValue,
                                                    "itemCategory": menuItem.doc.data.value.mapValue.fields.itemCategory.stringValue,
                                                    "itemPrice": menuItem.doc.data.value.mapValue.fields.itemPrice.doubleValue ? menuItem.doc.data.value.mapValue.fields.itemPrice.doubleValue : menuItem.doc.data.value.mapValue.fields.itemPrice.integerValue
                                                });
                                                setAddEditFormType("Edit");
                                                setShowAddEditForm(true);
                                            }}>✎ Edit</Button>{' '}
                                            <Button variant='danger' onClick={() => {
                                                setCurrentMenuItemId(menuItem.doc.key.path.segments[menuItem.doc.key.path.segments.length - 1]);
                                                setCurrentMenuItem({
                                                    "itemName": menuItem.doc.data.value.mapValue.fields.itemName.stringValue,
                                                    "itemCategory": menuItem.doc.data.value.mapValue.fields.itemCategory.stringValue,
                                                    "itemPrice": menuItem.doc.data.value.mapValue.fields.itemPrice.doubleValue ? menuItem.doc.data.value.mapValue.fields.itemPrice.doubleValue : menuItem.doc.data.value.mapValue.fields.itemPrice.integerValue
                                                });
                                                setShowDeleteDialogue(true);
                                            }}>x Delete</Button>
                                        </td>
                                    </tr>
                                )))}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between align-items-center">
                        <p style={{ marginTop: 8, fontSize: 12, color: '#A1A1A1' }}>SaltNPepper Menu v1.0.0 - <a href="/login">Logout</a></p>
                    </Card.Footer>
                </Card>
            </>}
        </>
    );
}

export default Dashboard;
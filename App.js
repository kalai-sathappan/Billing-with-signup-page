// App.js
import React from 'react';
import BillDetails from './Component/BillDetails';
import ItemList from './Component/ItemList';
import TotalAmount from './Component/TotalAmount';
import { jsPDF } from 'jspdf';
import './App.css';

function App() {
	const [items, setItems] = React.useState([]);

	const handleAddItem = (item) => {
		setItems([...items, item]);
	};

	const handleDeleteItem = (index) => {
		const updatedItems = [...items];
		updatedItems.splice(index, 1);
		setItems(updatedItems);
	};

	const calculateTotalAmount = () => {
		return items.reduce(
			(total, item) =>
				total +
				item.quantity *
				item.price, 0);
	};

	const handleDownloadPDF = () => {
		const pdf = new jsPDF();
		pdf.text('"Bill Statement":', 50, 20);

		// Add items to PDF
		items.forEach((item, index) => {
			const yPos = 40 + index * 25;
			pdf.text(
				`Item: ${item.item} =>, 
					Quantity: ${item.quantity}, 
					Price: ${item.price}`, 20, yPos);
		});

		// Add total amount to PDF
		const totalAmount =
			calculateTotalAmount();
		pdf.text(
			`Total Amount: 
					Rs.${totalAmount.toFixed(2)}`, 20, 180);

		// Save the PDF
		pdf.save('invoice.pdf');
	};

	return (
		<div className="App">
			<h1><center><u>"Register yourself"</u></center></h1>
			<BillDetails onAddItem={handleAddItem} />
			<ItemList items={items}
				onDeleteItem={handleDeleteItem} />
			<TotalAmount
				total={calculateTotalAmount()} />
			<button
				onClick={handleDownloadPDF}>Download PDF</button>
		</div>
	);
}

export default App;

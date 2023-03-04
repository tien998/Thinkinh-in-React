// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setIsStockOnly] = useState(false);

  return (
    <div className='App-header'>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFillterTextChange={setFilterText}
        onStockOnlyChange={setIsStockOnly} />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function SearchBar({ filterText, inStockOnly, onFillterTextChange, onStockOnlyChange }) {
  return (
    <form>
      <input type='text' value={filterText} placeholder='Search...'
        onChange={e=> onFillterTextChange(e.target.value)} /><br />
      <label>
        <input type='checkbox' checked={inStockOnly}
          onChange={e=> onStockOnlyChange(e.target.checked)} />
          {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let category = null;

  products.forEach(product => {
    if (product.name.toLowerCase().indexOf(filterText)) {
      return;
    };
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== category) {
      rows.push(
        <ProductCategoryRow category={product.category} key={product.category} />
      );
    }
    rows.push(
      <ProductRow product={product} key={product.name} />
    );
    category = product.category;
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th>{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>{product.name}</span>
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}




























// export default function App() {
//   return <FilterableProductTable products={PRODUCTS} />;
// };

// function FilterableProductTable({ products }) {
//   return (
//     <div className='App-header'>
//       <SearchBar />
//       <ProductTable products={products} />
//     </div>
//   );
// }

// function SearchBar() {
//   return (
//     <form>
//       <input type='text' placeholder='Searh...' />
//       <label>
//         <input type='checkbox' />
//         {' '}
//         Only show products in stock
//       </label>
//     </form>
//   );
// }

// function ProductTable({ products }) {
//   const rows = [];
//   let lastCategory = null;

//   products.forEach(prod => {
//     if (prod.category !== lastCategory) {
//       rows.push(
//         <ProductCategoryRow
//           category={prod.category}
//           key={prod.category} />
//       );
//     };
//     rows.push(
//       <ProductRow
//         product={prod}
//         key={prod.name} />
//     )
//     lastCategory = prod.category;
//   });
//   return (
//     <table>

//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Price</th>
//         </tr>
//       </thead>


//       <tbody>
//         {rows}
//       </tbody>
//     </table>
//   );
// }

// function ProductCategoryRow({ category }) {
//   return (
//     <tr>
//       <th colSpan={2}>
//         {category}
//       </th>
//     </tr>
//   );
// }

// function ProductRow({ product }) {
//   return (
//     <tr>
//       <td>
//         {product.name}
//       </td>
//       <td>
//         {product.price}
//       </td>
//     </tr>
//   );
// }




const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]
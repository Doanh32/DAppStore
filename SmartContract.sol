// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    string public name;
    uint256 public productCount = 0;
    mapping(uint256 => Product) public products;

    struct Product {
        uint256 id;
        string title;
        string description;
        uint256 price;
        address payable owner;
        bool purchased;
    }

    event ProductCreated(
        uint256 id,
        string title,
        string description,
        uint256 priceInSepoliaEth,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
        uint256 id,
        string title,
        string description,
        uint256 price,
        address payable owner,
        bool purchased
    );

    constructor() {
        name = "Marketplace";
    }

   function createProduct(string memory _title, string memory _description, uint _priceInSepoliaEth) public {
    require(bytes(_title).length > 0, "Title cannot be empty");
    require(bytes(_description).length <= 100, "Description cannot exceed 100 characters");
    require(_priceInSepoliaEth > 0, "Price must be greater than 0");

    productCount ++;
    products[productCount] = Product(productCount, _title, _description, _priceInSepoliaEth, payable (msg.sender), false);
    emit ProductCreated(productCount, _title, _description, _priceInSepoliaEth, payable (msg.sender), false);
}


    function purchaseProduct(uint256 _id) public payable {
        // Fetch the product
        Product storage _product = products[_id];
        // Fetch the owner
        address payable _seller = _product.owner;
        // Make sure the product has a valid id
        require(_product.id > 0 && _product.id <= productCount, "Invalid product id");
        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price, "Insufficient funds");
        // Require that the product has not been purchased already
        require(!_product.purchased, "Product already purchased");
        // Require that the buyer is not the seller
        require(_seller != payable(msg.sender), "Cannot buy your own product");
        // Transfer ownership to the buyer
        _product.owner = payable(msg.sender);
        // Mark as purchased
        _product.purchased = true;
        // Update the product
        products[_id] = _product;
        // Pay the seller by sending them Ether
        _seller.transfer(msg.value);
        // Trigger an event
        emit ProductPurchased(_id, _product.title, _product.description, _product.price, payable(msg.sender), true);
    }
}

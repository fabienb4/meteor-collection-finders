# fabienb4:collection-finders

A simple package to allow you to easily find documents within your collections using the `_id` or `name` field.

### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Change name field's name](#change-name-field-s-name)
- [License](#license)
- [Contributing](#contributing)

### Installation

In your Meteor app directory:

```
$ meteor add fabienb4:collection-finders
```

### Usage

Create a collection with a field to use as name (`name` being the default field's name, but it can be changed), and then use the `findByName`, `findIdByName` and `findNameById` functions to look for the wanted document.

You can specify the options you want to pass to the functions, just like you can with `findOne`.

_However, for `findIdByName` and `findNameById`, the `fields` option cannot be specified. To optimize the query, only the necessary field is included (respectively, `_id` and `name`). If you speficy the `fields` option for any of these two functions, it will be ignored._

### Examples

```js
Items = new Mongo.Collection("items");

Items.insert({ name: "Banana" });
// { _id: "DPMaoz9PjGGcSXiBo", name: "Banana" }
Items.insert({ name: "Apple" });
// { _id: "MMn5syL6moEMWW348", name: "Apple" }
Items.insert({ name: "Orange" });
// { _id: "eyRmPSRcThPqxnRoa", name: "Orange" }

Items.findByName("Apple");
// Return: { _id: "MMn5syL6moEMWW348", name: "Apple" }

Items.findIdByName("Orange");
// Return: "eyRmPSRcThPqxnRoa"

Items.findNameById("DPMaoz9PjGGcSXiBo");
// Return: "Banana"
```

### Change name field's name

If you want to be able to use the finders, but don't want the name field to be named `name`, you can overwrite the default using:

```js
Items._nameField = "title";

// You can then do:
Items.insert({ title: "Wooden Chair" });
// { _id: "h83Qnbq2N7ZsL9dET", title: "Wooden Chair" }
Items.findByName("Wooden Chair");
// Return: { _id: "h83Qnbq2N7ZsL9dET", title: "Wooden Chair" }
```

### License

MIT

### Contributing

Anyone is welcome to contribute. Fork, make your changes (test them!), and then submit a pull request.

[![Support via Gratipay](https://cdn.rawgit.com/gratipay/gratipay-badge/2.3.0/dist/gratipay.svg)](https://gratipay.com/fabienb4/)

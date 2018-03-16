# PubSweet component - Form Group

> This is a text input component (with validations) meant to be used in PubSweet applications.

## Install

```bash
npm install pubsweet-component-form-group
```

## Usage

In a PubSweet application, you can use this text input field like so:

```
<div>
    <h3>Create a new blog post</h3>
    <PubSweetFormGroup
      controlId='fragment.title'
      label='Title'
      placeholder='One fine day...'
      modelProperty='fragment.title'
      inputRef={(input) => { this.title = input }}
    />
</div>
```

The `modelProperty` tells the component which model and property this input field is describing, for example, `user.name` or `collection.title`. Validations for the input field will then be based on the validations for that specific model and property (defined in `pubsweet-server` and your configuration).

You can then get the value like so:

```js static
var title = ReactDOM.findDOMNode(this.title).value
```

## License

MIT

## Classes

<dl>
<dt><a href="#XpubCollabraMode">XpubCollabraMode</a></dt>
<dd><p>The base class for Xpub Collabra&#39;s Authsome mode.</p>
</dd>
<dt><a href="#RESTMode">RESTMode</a></dt>
<dd><p>This class is used to handle authorization requirements for REST endpoints.</p>
</dd>
<dt><a href="#GraphQLMode">GraphQLMode</a></dt>
<dd><p>This class is used to handle authorization requirements for GraphQL.</p>
</dd>
</dl>

<a name="XpubCollabraMode"></a>

## XpubCollabraMode

The base class for Xpub Collabra's Authsome mode.

**Kind**: global class

* [XpubCollabraMode](#XpubCollabraMode)
  * [new XpubCollabraMode(userId, operation, object, context)](#new_XpubCollabraMode_new)
  * _instance_
    * [.isAdmin](#XpubCollabraMode+isAdmin) ⇒ <code>boolean</code>
    * [.isAssignedHandlingEditor](#XpubCollabraMode+isAssignedHandlingEditor) ⇒ <code>boolean</code>
    * [.isAssignedSeniorEditor](#XpubCollabraMode+isAssignedSeniorEditor) ⇒ <code>boolean</code>
    * [.isManagingEditor](#XpubCollabraMode+isManagingEditor) ⇒ <code>boolean</code>
    * [.isAuthenticated](#XpubCollabraMode+isAuthenticated) ⇒ <code>boolean</code>
    * [.isTeamMember(user, teamType, object)](#XpubCollabraMode+isTeamMember) ⇒ <code>boolean</code>
    * [.unauthenticatedUser(operation, object)](#XpubCollabraMode+unauthenticatedUser) ⇒ <code>boolean</code>
    * [.isAuthor(user, object)](#XpubCollabraMode+isAuthor) ⇒ <code>boolean</code>
  * _static_
    * [.mapOperation(operation)](#XpubCollabraMode.mapOperation) ⇒ <code>string</code>

<a name="new_XpubCollabraMode_new"></a>

### new XpubCollabraMode(userId, operation, object, context)

Creates a new instance of XpubCollabraMode

| Param     | Type                | Description                                     |
| --------- | ------------------- | ----------------------------------------------- |
| userId    | <code>string</code> | A user's UUID                                   |
| operation | <code>string</code> | The operation you're authorizing for            |
| object    | <code>any</code>    | The object of authorization                     |
| context   | <code>any</code>    | Context for authorization, e.g. database access |

<a name="XpubCollabraMode+isAdmin"></a>

### xpubCollabraMode.isAdmin ⇒ <code>boolean</code>

Checks if the user is an author, as represented with the owners
relationship

**Kind**: instance property of [<code>XpubCollabraMode</code>](#XpubCollabraMode)

| Param | Type             |
| ----- | ---------------- |
| user  | <code>any</code> |

<a name="XpubCollabraMode+isAssignedHandlingEditor"></a>

### xpubCollabraMode.isAssignedHandlingEditor ⇒ <code>boolean</code>

Checks if user is a handling editor (member of a team of type handling editor) for an object

**Kind**: instance property of [<code>XpubCollabraMode</code>](#XpubCollabraMode)

| Param | Type             |
| ----- | ---------------- |
| user  | <code>any</code> |

<a name="XpubCollabraMode+isAssignedSeniorEditor"></a>

### xpubCollabraMode.isAssignedSeniorEditor ⇒ <code>boolean</code>

Checks if user is a senior editor (member of a team of type senior editor) for an object

**Kind**: instance property of [<code>XpubCollabraMode</code>](#XpubCollabraMode)

| Param | Type             |
| ----- | ---------------- |
| user  | <code>any</code> |

<a name="XpubCollabraMode+isManagingEditor"></a>

### xpubCollabraMode.isManagingEditor ⇒ <code>boolean</code>

Checks if user is a senior editor (member of a team of type senior editor) for an object

**Kind**: instance property of [<code>XpubCollabraMode</code>](#XpubCollabraMode)

| Param | Type             |
| ----- | ---------------- |
| user  | <code>any</code> |

<a name="XpubCollabraMode+isAuthenticated"></a>

### xpubCollabraMode.isAuthenticated ⇒ <code>boolean</code>

Checks if userId is present, indicating an authenticated user

**Kind**: instance property of [<code>XpubCollabraMode</code>](#XpubCollabraMode)

| Param  | Type             |
| ------ | ---------------- |
| userId | <code>any</code> |

<a name="XpubCollabraMode+isTeamMember"></a>

### xpubCollabraMode.isTeamMember(user, teamType, object) ⇒ <code>boolean</code>

Checks if user is a member of a team of a certain type for a certain object

**Kind**: instance method of [<code>XpubCollabraMode</code>](#XpubCollabraMode)

| Param    | Type             |
| -------- | ---------------- |
| user     | <code>any</code> |
| teamType | <code>any</code> |
| object   | <code>any</code> |

<a name="XpubCollabraMode+unauthenticatedUser"></a>

### xpubCollabraMode.unauthenticatedUser(operation, object) ⇒ <code>boolean</code>

Returns permissions for unauthenticated users

**Kind**: instance method of [<code>XpubCollabraMode</code>](#XpubCollabraMode)

| Param     | Type             |
| --------- | ---------------- |
| operation | <code>any</code> |
| object    | <code>any</code> |

<a name="XpubCollabraMode+isAuthor"></a>

### xpubCollabraMode.isAuthor(user, object) ⇒ <code>boolean</code>

Checks if the user is an author, as represented with the owners
relationship

**Kind**: instance method of [<code>XpubCollabraMode</code>](#XpubCollabraMode)

| Param  | Type             |
| ------ | ---------------- |
| user   | <code>any</code> |
| object | <code>any</code> |

<a name="XpubCollabraMode.mapOperation"></a>

### XpubCollabraMode.mapOperation(operation) ⇒ <code>string</code>

Maps operations from HTTP verbs to semantic verbs

**Kind**: static method of [<code>XpubCollabraMode</code>](#XpubCollabraMode)

| Param     | Type             |
| --------- | ---------------- |
| operation | <code>any</code> |

<a name="RESTMode"></a>

## RESTMode

This class is used to handle authorization requirements for REST endpoints.

**Kind**: global class

* [RESTMode](#RESTMode)
  * _instance_
    * [.determine()](#RESTMode+determine) ⇒ <code>any</code>
  * _static_
    * [.isListingCollections](#RESTMode.isListingCollections) ⇒ <code>boolean</code>

<a name="RESTMode+determine"></a>

### restMode.determine() ⇒ <code>any</code>

An async functions that's the entry point for determining
authorization results. Returns true (if allowed), false (if not allowed),
and { filter: function(filterable) } if partially allowed

**Kind**: instance method of [<code>RESTMode</code>](#RESTMode)  
**Returns**: <code>any</code> - Returns true, false or { filter: fn }  
<a name="RESTMode.isListingCollections"></a>

### RESTMode.isListingCollections ⇒ <code>boolean</code>

Determine if the current operation is a listing of the collections

**Kind**: static property of [<code>RESTMode</code>](#RESTMode)  
<a name="GraphQLMode"></a>

## GraphQLMode

This class is used to handle authorization requirements for GraphQL.

**Kind**: global class  
<a name="GraphQLMode.isListingCollections"></a>

### GraphQLMode.isListingCollections

Returns true if current operation is listing collections

**Kind**: static property of [<code>GraphQLMode</code>](#GraphQLMode)

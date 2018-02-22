Column Grid with Allocations

```js
<Container fluid>
  <Row>
    <Column
      allocations={['lg-12', 'xs-12', 'sm-12', 'md-12']}
      style="background:blue;"
    >
      C
    </Column>
  </Row>
  <Row>
    <Column allocations={['lg-6', 'xs-6', 'sm-6', 'md-6']}>C</Column>
    <Column allocations={['lg-6', 'sm-6', 'md-6']}>C</Column>
  </Row>
  <Row>
    <Column allocations={['lg-4', 'xs-4', 'sm-4', 'md-4']}>C</Column>
    <Column allocations={['lg-4', 'sm-4', 'md-4']}>C</Column>
    <Column allocations={['lg-4', 'xs-4', 'md-4']}>C</Column>
  </Row>
  <Row>
    <Column allocations={['lg-3', 'xs-3', 'sm-3', 'md-3']}>C</Column>
    <Column allocations={['lg-3', 'xs-3', 'sm-3', 'md-3']}>C</Column>
    <Column allocations={['lg-3', 'xs-3', 'sm-3', 'md-3']}>C</Column>
    <Column allocations={['lg-3', 'xs-3', 'sm-3', 'md-3']}>C</Column>
  </Row>
  <Row>
    <Column allocations={['lg-4', 'xs-4', 'sm-4', 'md-4']}>C</Column>
    <Column allocations={['lg-2', 'xs-2', 'sm-2', 'md-2']}>C</Column>
    <Column allocations={['lg-2', 'xs-2', 'sm-2', 'md-2']}>C</Column>
    <Column allocations={['lg-2', 'xs-2', 'sm-2', 'md-2']}>C</Column>
    <Column allocations={['lg-2', 'xs-2', 'sm-2', 'md-2']}>C</Column>
  </Row>
  <Row>
    <Column allocations={['lg-1', 'xs-1', 'sm-1', 'md-1']}>C</Column>
    <Column allocations={['lg-1', 'xs-1', 'sm-1', 'md-1']}>C</Column>
    <Column allocations={['lg-1', 'xs-1', 'sm-1', 'md-1']}>C</Column>
    <Column allocations={['lg-1', 'xs-1', 'sm-1', 'md-1']}>C</Column>
    <Column allocations={['lg-1', 'xs-1', 'sm-1', 'md-1']}>C</Column>
    <Column allocations={['lg-1', 'xs-1', 'sm-1', 'md-1']}>C</Column>
    <Column allocations={['lg-1', 'xs-1', 'sm-1', 'md-1']}>C</Column>
    <Column allocations={['lg-1', 'xs-1', 'sm-1', 'md-1']}>C</Column>
    <Column allocations={['lg-1', 'xs-1', 'sm-1', 'md-1']}>C</Column>
    <Column allocations={['lg-1', 'xs-1', 'sm-1', 'md-1']}>C</Column>
    <Column allocations={['lg-1', 'xs-1', 'sm-1', 'md-1']}>C</Column>
    <Column allocations={['lg-1', 'xs-1', 'sm-1', 'md-1']}>C</Column>
  </Row>
</Container>
```

Column Grid Auto

```js
<Container fluid>
  <Row>
    <Column>C</Column>
  </Row>
  <Row>
    <Column>C</Column>
    <Column>C</Column>
  </Row>
  <Row>
    <Column>C</Column>
    <Column>C</Column>
    <Column>C</Column>
  </Row>
  <Row>
    <Column>C</Column>
    <Column>C</Column>
  </Row>
  <Row>
    <Column>C</Column>
    <Column>C</Column>
  </Row>
  <Row>
    <Column>C</Column>
    <Column>C</Column>
    <Column>C</Column>
    <Column>C</Column>
  </Row>
</Container>
```

Column Grid with Offsets

```js
<Container fluid>
  <Row>
    <Column
      allocations={['lg-6', 'xs-6', 'sm-6', 'md-6']}
      offsets={['lg-6', 'xs-6', 'sm-6', 'md-6']}
    >
      C
    </Column>
  </Row>
  <Row>
    <Column
      allocations={['lg-3', 'xs-3', 'sm-3', 'md-3']}
      offsets={['lg-3', 'xs-3', 'sm-3', 'md-3']}
    >
      C
    </Column>
    <Column
      allocations={['lg-3', 'xs-3', 'sm-3', 'md-3']}
      offsets={['lg-3', 'xs-3', 'sm-3', 'md-3']}
    >
      C
    </Column>
  </Row>
  <Row>
    <Column>C</Column>
    <Column>C</Column>
    <Column>C</Column>
  </Row>
</Container>
```

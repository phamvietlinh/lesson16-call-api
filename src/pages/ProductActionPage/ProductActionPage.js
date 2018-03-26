import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {actAddProductRequest, actGetProductRequest, actUpdateProductRequest} from './../../actions/index';
import {connect} from 'react-redux';

class ProductActionPage extends Component {
    
    constructor(props){
        super(props);
        this.state = ({
            id: '',
            txtName: '',
            txtPrice: '',
            chkbStatus: ''
        })
    }

    componentDidMount(){
        var match = this.props.match;
        if(match){
            var id = match.params.id;
            this.props.onEditProduct(id)            
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.itemEditing){
                var itemEditing = nextProps.itemEditing;
                this.setState({
                    id: itemEditing.id,
                    txtName: itemEditing.name,
                    txtPrice: itemEditing.price,
                    chkbStatus: itemEditing.status
                })
            }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox'? target.checked: target.value;
        this.setState({
            [name]: value
        })
    }

    onSave = (event) => {
        event.preventDefault();
        var id = this.state.id;
        var txtName = this.state.txtName;
        var txtPrice = this.state.txtPrice;
        var chkbStatus = this.state.chkbStatus;
        var history = this.props.history;
        var product = {
            id: id,
            name: txtName,
            price: txtPrice,
            status: chkbStatus
        }
        if(id){
            this.props.onUpdateProduct(product)
        }else {
            this.props.onAddProduct(product);
            
        }
        history.goBack()
    }

    render() {
        // var products = [];
        var txtName = this.state.txtName;
        var txtPrice = this.state.txtPrice;
        var chkbStatus = this.state.chkbStatus;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit={this.onSave}>
                    <div className="form-group">
                        <label>Ten San Pham: </label>
                        <input type="text" className="form-control" name="txtName" value={txtName} onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Gia: </label>
                        <input type="number" className="form-control" name="txtPrice" value={txtPrice} onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Trang Thai: </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" name="chkbStatus" value={chkbStatus} onChange={this.onChange} checked={chkbStatus} />
                            Con Hang
                        </label>
                    </div>        
                    
                    <Link to="/product-list" className="btn btn-danger mr-10">Tro Lai</Link>
                    <button type="submit" className="btn btn-primary">Luu Lai</button>

                </form>
            </div>

        );
    }

}

const mapStateToProps = (state) => {
    return {
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddProduct: (product) => {
            dispatch(actAddProductRequest(product))
        },
        onEditProduct: (id) => {
            dispatch(actGetProductRequest(id))
        },
        onUpdateProduct: (product) => {
            dispatch(actUpdateProductRequest(product))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);

import React from 'react';
import ReactDOM from 'react-dom';
import '../css/animate.min.css';
import './style/style.sass';

const Modal = ({
    visible = false,
    title = '标题',
    closeIco = true,
    cancelBtn = false,
    textAlign = 'left',
    ico = '',
    children = '请输入内容',
    okText = '确定',
    cancelText = '取消',
    onOk = () => { },
    onCancel = () => { }
}) => {
    return (
        visible ?
            ReactDOM.createPortal(
                <div className="modal_wrapper">
                    <div className="modal_container">
                        <div>
                            {closeIco &&
                                <span className="modal_close" onClick={onCancel}>X</span>
                            }
                            <div className={`modal_box animate__animated ${visible ? 'animate__zoomIn' : 'animate__zoomOut'}`}>
                                {ico}
                                <h5 className="modal_title">{title}</h5>
                                <div className="modal_content" style={{ textAlign: textAlign }}>
                                    {children}
                                </div>
                                <div className="modal_button">
                                    <button className="modal_ok" onClick={onOk}>{okText}</button>
                                    {cancelBtn &&
                                        <button className="modal_cancel" onClick={onCancel}>{cancelText}</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                , document.querySelector('body')) : null
    )
}

const HOCModal = Component => {
    return ({
        visible,
        closeIco,
        cancelBtn,
        onOk = () => { },
        onCancel = () => { },
        ico,
        content = '请输入内容',
        name,
        destroy,
        ...props
    }) => {
        const onOk_change = () => {
            onOk();
            destroy();
        }
        const onCancel_change = () => {
            onCancel();
            destroy();
        }
        return (
            <Component
                visible
                closeIco={closeIco}
                cancelBtn={cancelBtn}
                onOk={onOk_change}
                onCancel={onCancel_change}
                children={content}
                ico={ico}
                {...props}
            />
        )
    }
}

['confirm', 'info', 'success', 'error', 'warning'].forEach(item => {
    Modal[item] = props => {
        let div = document.createElement('div');
        // document.body.appendChild(div);
        const FunModal = HOCModal(Modal);
        let currentConfig = Object.assign({}, props);
        const destroy = () => {
            const unmountResult = ReactDOM.unmountComponentAtNode(div);
            if (unmountResult && div.parentNode) {
                div.parentNode.removeChild(div);
            }
        }
        const render = config => {
            ReactDOM.render(
                <FunModal
                    destroy={destroy}
                    name={item}
                    {...config}
                />, div);
        }

        const update = newConfig => {
            currentConfig = Object.assign({}, currentConfig, newConfig);

            render(currentConfig);
        }
        render(currentConfig);

        return {
            destroy: destroy,
            update: update
        }
    }
})

export default Modal;
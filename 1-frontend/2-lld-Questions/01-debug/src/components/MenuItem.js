function MenuItem({ item }) {
    return (
        <button className="menu-item" onClick={item?.fn}>
            <div className="menu-item__label">{item?.label}</div>
        </button>
    );
}

export default MenuItem;

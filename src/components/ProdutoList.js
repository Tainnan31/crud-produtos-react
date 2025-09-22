import React, { useEffect, useState } from 'react';
import ProdutoForm from './ProdutoForm';

const API_PRODUCTS = 'http://localhost:3000/produtos';

function ProdutoList() {
  const [produtos, setProdutos] = useState([]);
  const [editProduto, setEditProduto] = useState(null);

  const fetchProdutos = async () => {
    try {
      const res = await fetch(API_PRODUCTS);
      const data = await res.json();
      setProdutos(data);
    } catch {}
  };

  const handleEdit = (produto) => setEditProduto(produto);

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja realmente excluir este produto?')) return;
    try {
      await fetch(`${API_PRODUCTS}/${id}`, { method: 'DELETE' });
      fetchProdutos();
    } catch {}
  };

  useEffect(() => { fetchProdutos(); }, []);

  return (
    <div>
      <button className="btn btn-primary mb-3" onClick={() => setEditProduto({})}>+ Novo Produto</button>
      {editProduto && <ProdutoForm produto={editProduto} setEditProduto={setEditProduto} fetchProdutos={fetchProdutos} />}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(p => (
            <tr key={p.id || p._id || p.produtoId}>
              <td>{p.id || p._id || p.produtoId}</td>
              <td>{p.nome || p.name || p.titulo}</td>
              <td>R$ {Number(p.preco || p.price || p.valor || 0).toFixed(2)}</td>
              <td>{p.quantidade || p.stock || p.qtde || 0}</td>
              <td>{p.descricao || p.description || p.desc || ''}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleEdit(p)}>Editar</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id || p._id || p.produtoId)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProdutoList;

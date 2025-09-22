import React, { useState } from 'react';

const API_PRODUCTS = 'http://localhost:3000/produtos';

function ProdutoForm({ produto, setEditProduto, fetchProdutos }) {
  const [nome, setNome] = useState(produto.nome || produto.name || '');
  const [preco, setPreco] = useState(produto.preco || produto.price || 0);
  const [quantidade, setQuantidade] = useState(produto.quantidade || produto.stock || 0);
  const [descricao, setDescricao] = useState(produto.descricao || produto.description || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { nome, preco, quantidade, descricao };
    const id = produto.id || produto._id || produto.produtoId;

    try {
      if (id) {
        await fetch(`${API_PRODUCTS}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch(API_PRODUCTS, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      fetchProdutos();
      setEditProduto(null);
    } catch {}
  };

  return (
    <div className="card mb-3 p-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input type="text" className="form-control" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
        </div>
        <div className="mb-2">
          <input type="number" step="0.01" className="form-control" placeholder="Preço" value={preco} onChange={e => setPreco(e.target.value)} required />
        </div>
        <div className="mb-2">
          <input type="number" className="form-control" placeholder="Quantidade" value={quantidade} onChange={e => setQuantidade(e.target.value)} required />
        </div>
        <div className="mb-2">
          <textarea className="form-control" placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-success me-2">Salvar</button>
        <button type="button" className="btn btn-secondary" onClick={() => setEditProduto(null)}>Cancelar</button>
      </form>
    </div>
  );
}

export default ProdutoForm;

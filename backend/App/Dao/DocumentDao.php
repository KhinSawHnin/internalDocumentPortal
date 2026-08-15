<?php

namespace App\Dao;

use App\Models\Document;

class DocumentDao
{
  public function getDocuments()
  {
    return Document::with(['user:id,name'])->get();
  }

  public function removeDocument(Document $document)
  {
    return $document->delete();
  }
  public function storeDocuments(array $data){
    return Document::create($data);
  }
  public function getDocumentById(int $id){
    return Document::findOrFail($id);
  }

}

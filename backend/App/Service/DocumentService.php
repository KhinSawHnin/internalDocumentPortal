<?php

namespace App\Service;

use App\Dao\DocumentDao;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
class DocumentService
{
  protected DocumentDao $documentDao;
  public function __construct(DocumentDao $documentDao)
  {
    $this->documentDao = $documentDao;
  }
  public function getDocuments()
  {

    return $this->documentDao->getDocuments();
  }
  public function removeDocument(int $id)
  {
    $document = $this->documentDao->getDocumentById($id);

    if ($document->user_id !== auth()->id()) {
      abort(403, 'You are not authorized to delete this document.');
    }

    if (Storage::disk('local')->exists($document->file_path)) {
      Storage::disk('local')->delete($document->file_path);
    }

    $this->documentDao->removeDocument($document);
  }

  private function sanitizeFilename(string $name): string
  {
    $ext = pathinfo($name, PATHINFO_EXTENSION);
    $base = pathinfo($name, PATHINFO_FILENAME);
    $safe = Str::slug($base);
    return $safe . '_' . uniqid() . '.' . $ext; 
  }

  public function storeDocuments(array $data)
  {
    $file = $data['document'];

    $originalName = $file->getClientOriginalName(); 
    $storedFilename = $this->sanitizeFilename($originalName); 
    $path = $file->storeAs('documents', $storedFilename, 'local');

    return $this->documentDao->storeDocuments([
      'user_id'   => auth()->id(),
      'title'     => $data['title'],
      'file_path' => $path,            
      'file_name' => $originalName,    
      'file_size' => $file->getSize(),
      'mime_type' => $file->getMimeType(),
    ]);
  }
  public function downloadDocument(int $id){

    $document = $this->documentDao->getDocumentById($id);

    if (!Storage::disk('local')->exists($document->file_path)) {
      abort(404, 'File not found.');
    }

    return Storage::disk('local')->download(
      $document->file_path,
      $document->file_name
    );
  }
}

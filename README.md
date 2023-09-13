#####

Übung: Validation / Sanitization

Füge dem Recordshop Validation (gültige Daten) und Sanitization (saubere Daten) hinzu, um sicher zu stellen, das die Daten, welche in der Datenbank gespeichert werden, die gewünschte Qualität haben.
Hier  findest du eine documentation, zu verfügbaren Methoden.
Priorität in dieser Übung hat erstmal der User Controller. Wenn du diesen fertig hast, kannst du auch eine validation / sanitization zu Order und Record hinzufügen. 

####

Füge dem Rekordshop einen User Login hinzu, um einzelne routes zu schützen. 
Die route user/:id soll geschützt werden. Das heißt get, put  und delete user soll nur für den eingeloggten Nutzer möglich sein.

####

Übung für heute, Login überarbeiten - das erstellte Token in einem Cookie speichern - Nur der jeweils eingeloggte User soll auf seine eigenen Userdaten auf der route für user/:id get, put und delete zugreifen können.

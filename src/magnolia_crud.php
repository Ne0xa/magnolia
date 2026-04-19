<?php
try {
    $pdo = new PDO("mysql:host=localhost;dbname=magnolia", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
    exit();
}

// AJOUT D'UNE CARTE
if (
    $_SERVER["REQUEST_METHOD"] == "POST" &&
    isset($_POST["action"]) &&
    $_POST["action"] == "ajouter"
) {
    $nom = trim($_POST["nom"]);
    $set_carte = trim($_POST["set_carte"]);
    $image_url = trim($_POST["image_url"]);
    $disponible = isset($_POST["disponible"]) ? 1 : 0;

    if (!empty($nom) && !empty($set_carte) && !empty($image_url)) {
        $req = $pdo->prepare(
            "INSERT INTO cartes (nom, set_carte, image_url, disponible) VALUES (:nom, :set_carte, :image_url, :disponible)",
        );
        $req->execute([
            "nom" => $nom,
            "set_carte" => $set_carte,
            "image_url" => $image_url,
            "disponible" => $disponible,
        ]);
        echo "<p style='color:green;'>Carte ajoutee</p>";
    } else {
        echo "<p style='color:red;'>Veuillez remplir les champs</p>";
    }
}

// MODIFICATION D'UNE CARTE
if (
    $_SERVER["REQUEST_METHOD"] == "POST" &&
    isset($_POST["action"]) &&
    $_POST["action"] == "modifier"
) {
    $id = (int) $_POST["id"];
    $nom = trim($_POST["nom"]);
    $set_carte = trim($_POST["set_carte"]);
    $image_url = trim($_POST["image_url"]);
    $disponible = isset($_POST["disponible"]) ? 1 : 0;

    if ($id > 0 && !empty($nom) && !empty($set_carte) && !empty($image_url)) {
        $req = $pdo->prepare(
            "UPDATE cartes SET nom = :nom, set_carte = :set_carte, image_url = :image_url, disponible = :disponible WHERE id = :id",
        );
        $req->execute([
            "nom" => $nom,
            "set_carte" => $set_carte,
            "image_url" => $image_url,
            "disponible" => $disponible,
            "id" => $id,
        ]);
        echo "<p style='color:green;'>Carte modifiee</p>";
    } else {
        echo "<p style='color:red;'>Donnees invalides</p>";
    }
}

// SUPPRESSION D'UNE CARTE
if (isset($_GET["supprimer"])) {
    $id = (int) $_GET["supprimer"];
    if ($id > 0) {
        $req = $pdo->prepare("DELETE FROM cartes WHERE id = :id");
        $req->execute(["id" => $id]);
        echo "<p style='color:green;'>Carte supprimee</p>";
    }
}

// AFFICHAGE DE TOUTES LES CARTES
$query = $pdo->query("SELECT * FROM cartes ORDER BY nom ASC");
$cartes = $query->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Magnolia - Gestion des cartes</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { border-collapse: collapse; width: 100%; }
        table, th, td { border: 1px solid #ccc; }
        th, td { padding: 8px; text-align: left; }
        th { background-color: #f0f0f0; }
        img { width: 60px; }
        form input { margin-bottom: 10px; display: block; padding: 5px; width: 300px; }
        form label { font-weight: bold; display: block; }
        button { padding: 6px 14px; cursor: pointer; }
    </style>
</head>
<body>

<h1>Magnolia - Gestion des cartes</h1>

<!-- FORMULAIRE AJOUT -->
<h2>Ajouter une carte</h2>
<form method="POST" action="">
    <input type="hidden" name="action" value="ajouter">

    <label>Nom de la carte :</label>
    <input type="text" name="nom" required>

    <label>Set :</label>
    <input type="text" name="set_carte" required>

    <label>URL de l'image :</label>
    <input type="text" name="image_url" placeholder="https://images.pokemontcg.io/..." required>

    <label>
        <input type="checkbox" name="disponible" checked> Disponible
    </label>
    <br>
    <button type="submit">Ajouter la carte</button>
</form>

<hr>

<!-- LISTE DES CARTES -->
<h2>Liste des cartes</h2>
<table>
    <tr>
        <th>ID</th>
        <th>Image</th>
        <th>Nom</th>
        <th>Set</th>
        <th>Disponible</th>
        <th>Actions</th>
    </tr>
    <?php foreach ($cartes as $carte): ?>
    <tr>
        <td><?= $carte["id"] ?></td>
        <td><img src="<?= htmlspecialchars(
            $carte["image_url"],
        ) ?>" alt="<?= htmlspecialchars($carte["nom"]) ?>"></td>
        <td><?= htmlspecialchars($carte["nom"]) ?></td>
        <td><?= htmlspecialchars($carte["set_carte"]) ?></td>
        <td><?= $carte["disponible"] ? "Oui" : "Non" ?></td>
        <td>
            <a href="?modifier=<?= $carte["id"] ?>">Modifier</a>
            |
            <a href="?supprimer=<?= $carte[
                "id"
            ] ?>" onclick="return confirm('Supprimer cette carte ?')">Supprimer</a>
        </td>
    </tr>
    <?php endforeach; ?>
</table>

<!-- FORMULAIRE MODIFICATION -->
<?php if (isset($_GET["modifier"])): ?>
    <?php
    $id = (int) $_GET["modifier"];
    $req = $pdo->prepare("SELECT * FROM cartes WHERE id = :id");
    $req->execute(["id" => $id]);
    $carte = $req->fetch(PDO::FETCH_ASSOC);
    ?>
    <?php if ($carte): ?>
    <hr>
    <h2>Modifier : <?= htmlspecialchars($carte["nom"]) ?></h2>
    <form method="POST" action="">
        <input type="hidden" name="action" value="modifier">
        <input type="hidden" name="id" value="<?= $carte["id"] ?>">

        <label>Nom :</label>
        <input type="text" name="nom" value="<?= htmlspecialchars(
            $carte["nom"],
        ) ?>" required>

        <label>Set :</label>
        <input type="text" name="set_carte" value="<?= htmlspecialchars(
            $carte["set_carte"],
        ) ?>" required>

        <label>URL de l'image :</label>
        <input type="text" name="image_url" value="<?= htmlspecialchars(
            $carte["image_url"],
        ) ?>" required>

        <label>
            <input type="checkbox" name="disponible" <?= $carte["disponible"]
                ? "checked"
                : "" ?>> Disponible
        </label>
        <br>
        <button type="submit">Enregistrer les modifications</button>
    </form>
    <?php endif; ?>
<?php endif; ?>

</body>
</html>

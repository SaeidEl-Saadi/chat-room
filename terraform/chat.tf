resource "kubernetes_deployment_v1" "chat" {
  metadata {
    name      = "chat"
    namespace = kubernetes_namespace_v1.chat.metadata[0].name
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = "chat"
      }
    }

    template {
      metadata {
        labels = {
          app = "chat"
        }
      }

      spec {
        container {
          name              = "chat"
          image             = "chat-room:v2"
          image_pull_policy = "IfNotPresent"

          port {
            container_port = 3000
          }

          readiness_probe {
            http_get {
              path = "/health"
              port = 3000
            }

            initial_delay_seconds = 5
            period_seconds        = 10
          }

          liveness_probe {
            http_get {
              path = "/health"
              port = 3000
            }

            initial_delay_seconds = 10
            period_seconds        = 10
          }
        }
      }
    }
  }
}

resource "kubernetes_service_v1" "chat" {
  metadata {
    name      = "chat-service"
    namespace = kubernetes_namespace_v1.chat.metadata[0].name
  }

  spec {
    selector = {
      app = "chat"
    }

    port {
      port        = 3000
      target_port = 3000
    }

    type = "ClusterIP"
  }
}
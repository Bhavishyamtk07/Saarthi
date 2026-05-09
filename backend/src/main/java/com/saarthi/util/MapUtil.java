package com.saarthi.util;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Utility class providing Map factory methods compatible with JDK 8.
 */
public class MapUtil {

    public static <K, V> Map<K, V> of(K k1, V v1) {
        Map<K, V> m = new HashMap<>();
        m.put(k1, v1);
        return Collections.unmodifiableMap(m);
    }

    public static <K, V> Map<K, V> of(K k1, V v1, K k2, V v2) {
        Map<K, V> m = new HashMap<>();
        m.put(k1, v1); m.put(k2, v2);
        return Collections.unmodifiableMap(m);
    }

    public static <K, V> Map<K, V> of(K k1, V v1, K k2, V v2, K k3, V v3) {
        Map<K, V> m = new HashMap<>();
        m.put(k1, v1); m.put(k2, v2); m.put(k3, v3);
        return Collections.unmodifiableMap(m);
    }

    public static Map<String, Object> of(String k1, Object v1, String k2, Object v2, String k3, Object v3, String k4, Object v4) {
        Map<String, Object> m = new HashMap<>();
        m.put(k1, v1); m.put(k2, v2); m.put(k3, v3); m.put(k4, v4);
        return Collections.unmodifiableMap(m);
    }

    public static Map<String, Object> of(String k1, Object v1, String k2, Object v2, String k3, Object v3, String k4, Object v4, String k5, Object v5, String k6, Object v6, String k7, Object v7) {
        Map<String, Object> m = new HashMap<>();
        m.put(k1, v1); m.put(k2, v2); m.put(k3, v3); m.put(k4, v4); m.put(k5, v5); m.put(k6, v6); m.put(k7, v7);
        return Collections.unmodifiableMap(m);
    }
}

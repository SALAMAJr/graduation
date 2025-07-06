// ✅ ListingsScreen.dart (معدل لدعم Propose Swap بشكل سليم)
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:furniswap/data/models/createproduct/product_item.dart';
import 'package:furniswap/icons/icons.dart';
import 'package:furniswap/presentation/manager/productCubit/product_cubit.dart';
import 'package:furniswap/presentation/screens/CreateProductScreen.dart';
import 'package:furniswap/presentation/screens/messagesListScreen.dart';
import 'package:furniswap/presentation/screens/notificationsScreen.dart';
import 'package:furniswap/presentation/screens/updateProductScreen.dart';

class ListingsScreen extends StatefulWidget {
  final bool isSelectingForSwap;

  const ListingsScreen({super.key, this.isSelectingForSwap = false});

  @override
  State<ListingsScreen> createState() => _ListingsScreenState();
}

class _ListingsScreenState extends State<ListingsScreen> {
  @override
  void initState() {
    super.initState();
    context.read<ProductCubit>().getMyProducts();
  }

  Widget buildListingItem(BuildContext context, ProductItem product) {
    return Material(
      color: Colors.transparent,
      borderRadius: BorderRadius.circular(12),
      child: InkWell(
        onTap: () {
          if (widget.isSelectingForSwap) {
            print("✔️ Selected for swap: ${product.id}");
            Navigator.pop(
                context, product.id.toString()); // 👈 تحويل إلى String
          } else {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => UpdateProductScreen(product: product),
              ),
            );
          }
        },
        borderRadius: BorderRadius.circular(12),
        splashColor: Colors.brown.withOpacity(0.1),
        highlightColor: Colors.brown.withOpacity(0.2),
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: 5, vertical: 8),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            boxShadow: const [
              BoxShadow(
                color: Colors.black12,
                blurRadius: 6,
                offset: Offset(0, 2),
              )
            ],
            border: Border.all(color: Colors.grey.shade300, width: 1),
          ),
          child: Row(
            children: [
              Stack(
                children: [
                  ClipRRect(
                    borderRadius: const BorderRadius.only(
                      topLeft: Radius.circular(12),
                      bottomLeft: Radius.circular(12),
                    ),
                    child: SizedBox(
                      height: 125,
                      width: 125,
                      child: Image.network(
                        product.imageUrl ?? " ",
                        fit: BoxFit.cover,
                        errorBuilder: (_, __, ___) =>
                            const Icon(Icons.image_not_supported),
                      ),
                    ),
                  ),
                  if (widget.isSelectingForSwap)
                    Positioned(
                      top: 6,
                      right: 6,
                      child: Container(
                        padding: const EdgeInsets.all(4),
                        decoration: BoxDecoration(
                          color: Colors.green.shade600,
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(
                          Icons.check_circle,
                          color: Colors.white,
                          size: 20,
                        ),
                      ),
                    ),
                ],
              ),
              const SizedBox(width: 5),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: Text(
                              product.name,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                color: Color(0xff4A3419),
                                fontSize: 16,
                              ),
                            ),
                          ),
                          if (!widget.isSelectingForSwap) ...[
                            IconButton(
                              style: TextButton.styleFrom(
                                padding: const EdgeInsets.symmetric(
                                    vertical: 8, horizontal: 3),
                                minimumSize: Size.zero,
                                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                              ),
                              icon: const Icon(MyFlutterApp.edit,
                                  size: 18, color: Colors.black),
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) =>
                                        UpdateProductScreen(product: product),
                                  ),
                                );
                              },
                            ),
                            IconButton(
                              style: TextButton.styleFrom(
                                padding: const EdgeInsets.symmetric(
                                    vertical: 8, horizontal: 3),
                                minimumSize: Size.zero,
                                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                              ),
                              icon: const Icon(MyFlutterApp.trash_empty,
                                  size: 20, color: Colors.black),
                              onPressed: () {
                                showDialog(
                                  context: context,
                                  builder: (context) => AlertDialog(
                                    title: const Text("تأكيد الحذف"),
                                    content: const Text(
                                        "هل أنت متأكد أنك تريد حذف هذا المنتج؟"),
                                    actions: [
                                      TextButton(
                                        child: const Text("إلغاء"),
                                        onPressed: () => Navigator.pop(context),
                                      ),
                                      TextButton(
                                        child: const Text("نعم، حذف",
                                            style:
                                                TextStyle(color: Colors.red)),
                                        onPressed: () async {
                                          final productCubit =
                                              context.read<ProductCubit>();
                                          Navigator.pop(context);
                                          await productCubit
                                              .deleteProduct(product.id);
                                          await productCubit.getMyProducts();
                                        },
                                      ),
                                    ],
                                  ),
                                );
                              },
                            ),
                          ]
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(
                        "\$${product.price.toStringAsFixed(0)}",
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          color: Color(0xff8B5E34),
                          fontSize: 14,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          _buildTag(product.condition, Colors.brown.shade50,
                              const Color(0xff8B5E34)),
                          const SizedBox(width: 6),
                          _buildTag(product.type, const Color(0xff694A38),
                              Colors.white),
                        ],
                      ),
                    ],
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTag(String text, Color bgColor, Color textColor) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        text,
        style: TextStyle(color: textColor, fontSize: 12),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xffF5EFE6),
      appBar: AppBar(
        backgroundColor: Colors.white,
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xff694A38)),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          "My Listings",
          style: TextStyle(
            color: Color(0xff694A38),
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          IconButton(
            icon:
                const Icon(Icons.notifications_none, color: Color(0xff694A38)),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => const NotificationsScreen()),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.sms_outlined, color: Color(0xff694A38)),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => const MessagesListScreen()),
              );
            },
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            if (!widget.isSelectingForSwap)
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const CreateProductScreen(),
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 12),
                  elevation: 5,
                  backgroundColor: const Color(0xff694A38),
                  shadowColor: Colors.black26,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(90),
                  ),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: const [
                    Icon(Icons.add, color: Colors.black, size: 20),
                    SizedBox(width: 3),
                    Text("Add New", style: TextStyle(color: Colors.white)),
                  ],
                ),
              ),
            const SizedBox(height: 10),
            Expanded(
              child: RefreshIndicator(
                onRefresh: () async {
                  await context.read<ProductCubit>().getMyProducts();
                },
                child: BlocListener<ProductCubit, ProductState>(
                  listener: (context, state) {
                    if (state is ProductDeletedSuccess) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text("✅ تم حذف المنتج بنجاح")),
                      );
                    } else if (state is ProductFailure) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text("❌ ${state.message}")),
                      );
                    }
                  },
                  child: BlocBuilder<ProductCubit, ProductState>(
                    builder: (context, state) {
                      if (state is ProductLoading) {
                        return const Center(child: CircularProgressIndicator());
                      } else if (state is ProductFailure) {
                        return Center(child: Text("❌ ${state.message}"));
                      } else if (state is ProductListSuccess) {
                        final products = state.products;
                        if (products.isEmpty) {
                          return const Center(
                              child: Text("لا يوجد منتجات حالياً."));
                        }
                        return ListView.builder(
                          itemCount: products.length,
                          itemBuilder: (context, index) =>
                              buildListingItem(context, products[index]),
                        );
                      } else {
                        return const Center(
                            child: Text("جارٍ تحميل المنتجات..."));
                      }
                    },
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
